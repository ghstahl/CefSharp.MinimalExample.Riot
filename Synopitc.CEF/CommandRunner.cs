﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Mono.Options;
using Synoptic.Exceptions;

namespace Synoptic
{
    public class CommandRunner
    {
        private ICommandDependencyResolver _resolver = new ActivatorCommandDependencyResolver();

        private readonly List<Command> _availableCommands = new List<Command>();
        private readonly CommandFinder _commandFinder = new CommandFinder();
        private readonly ICommandActionFinder _commandActionFinder = new CommandActionFinder();
        private readonly HelpGenerator _helpGenerator = new HelpGenerator();
        private OptionSet _optionSet;

        public RunResult Run(string[] args)
        {
            if (args == null)
                args = new string[0];

            Queue<string> arguments = new Queue<string>(args);

            if (_optionSet != null)
                arguments = new Queue<string>(_optionSet.Parse(args));

            if (_availableCommands.Count == 0)
                WithCommandsFromAssembly(Assembly.GetCallingAssembly());

            try
            {
                if (_availableCommands.Count == 0)
                    throw new NoCommandsDefinedException();

                if (arguments.Count == 0)
                {
                    _helpGenerator.ShowCommandUsage(_availableCommands, _optionSet);
                    return new RunResult();
                }

                var commandName = arguments.Dequeue();

                var commandSelector = new CommandSelector();
                var command = commandSelector.Select(commandName, _availableCommands);

                var actionName = arguments.Count > 0 ? arguments.Dequeue() : null;
                var availableActions = _commandActionFinder.FindInCommand(command);

                if (actionName == null)
                {
                    _helpGenerator.ShowCommandHelp(command, availableActions.ToList());
                    return new RunResult();
                }

                var actionSelector = new ActionSelector();
                var action = actionSelector.Select(actionName, command, availableActions);

                var parser = new CommandLineParser();

                CommandLineParseResult parseResult = parser.Parse(action, arguments.ToArray());
                return parseResult.CommandAction.Run(_resolver, parseResult);
            }
            catch (CommandParseExceptionBase exception)
            {
                exception.Render();
            }
            catch (TargetInvocationException exception)
            {
                Exception innerException = exception.InnerException;
                if (innerException == null) throw;

                if (innerException is CommandParseExceptionBase)
                {
                    ((CommandParseExceptionBase)exception.InnerException).Render();
                    return new RunResult();
                }

                throw new CommandInvocationException("Error executing command", innerException);
            }
            return new RunResult();
        }

        public CommandRunner WithDependencyResolver(ICommandDependencyResolver resolver)
        {
            _resolver = resolver;
            return this;
        }

        public CommandRunner WithCommandFromType<T>()
        {
            _availableCommands.Add(_commandFinder.FindInType(typeof(T)));
            return this;
        }

        public CommandRunner WithCommandsFromAssembly(Assembly assembly)
        {
            _availableCommands.AddRange(_commandFinder.FindInAssembly(assembly));
            return this;
        }

        public CommandRunner WithGlobalOptions(OptionSet optionSet)
        {
            _optionSet = optionSet;
            return this;
        }
    }
}