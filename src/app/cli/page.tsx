"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Column } from "@once-ui-system/core";
import { person, social, about, work } from "@/resources";

const CLIPage = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{type: string, content: any}>>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Dynamic commands using actual portfolio data
  const commands: Record<string, any> = {
    help: {
      description: 'Show available commands',
      action: () => {
        return (
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold mb-4">Available Commands:</div>
            {Object.entries(commands).map(([cmd, info]) => (
              <div key={cmd} className="ml-4 flex items-start gap-3 group hover:translate-x-2 transition-transform">
                <span className="text-green-400 font-mono min-w-[120px]">{cmd}</span>
                <span className="text-gray-500">→</span>
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{info.description}</span>
              </div>
            ))}
          </div>
        );
      }
    },
    about: {
      description: 'Learn about me',
      action: () => (
        <div className="space-y-3">
          <div className="text-cyan-400 text-xl font-bold mb-2">
            ╭─ About {person.name}
          </div>
          <div className="text-gray-300 ml-4 space-y-2">
            <p className="flex items-center gap-2">
              <span className="text-green-400">▸</span>
              <span className="text-gray-500">Name:</span> 
              <span>{person.name}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-400">▸</span>
              <span className="text-gray-500">Role:</span> 
              <span>{person.role}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-400">▸</span>
              <span className="text-gray-500">Location:</span> 
              <span>{person.location}</span>
            </p>
            {person.languages && person.languages.length > 0 && (
              <p className="flex items-center gap-2">
                <span className="text-green-400">▸</span>
                <span className="text-gray-500">Languages:</span> 
                <span>{person.languages.join(', ')}</span>
              </p>
            )}
            <div className="mt-4 text-gray-400 leading-relaxed border-l-2 border-cyan-400 pl-4">
              {about.intro.description}
            </div>
          </div>
        </div>
      )
    },
    skills: {
      description: 'View technical skills',
      action: () => (
        <div className="space-y-3">
          <div className="text-cyan-400 text-xl font-bold mb-2">╭─ Technical Skills</div>
          <div className="ml-4 space-y-3">
            {about.technical.skills.map((skill, index) => (
              <div key={index} className="space-y-2 border-l-2 border-gray-700 pl-4 hover:border-green-400 transition-colors">
                <div className="text-green-400 font-semibold">{skill.title}</div>
                {skill.description && (
                  <div className="text-gray-400 text-sm">{skill.description}</div>
                )}
                {skill.tags && skill.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {skill.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    },
    experience: {
      description: 'View work experience',
      action: () => (
        <div className="space-y-3">
          <div className="text-cyan-400 text-xl font-bold mb-2">╭─ Work Experience</div>
          <div className="ml-4 space-y-4">
            {about.work.experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-400 pl-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="text-green-400 font-semibold text-lg">{exp.company}</div>
                  <div className="text-gray-500 text-sm">{exp.timeframe}</div>
                </div>
                <div className="text-blue-300 text-sm">{exp.role}</div>
                <div className="space-y-1 mt-2">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="text-gray-400 text-sm flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    education: {
      description: 'View education background',
      action: () => (
        <div className="space-y-3">
          <div className="text-cyan-400 text-xl font-bold mb-2">╭─ Education</div>
          <div className="ml-4 space-y-3">
            {about.studies.institutions.map((inst, index) => (
              <div key={index} className="border-l-2 border-purple-400 pl-4">
                <div className="text-green-400 font-semibold">{inst.name}</div>
                <div className="text-gray-400 text-sm mt-1">{inst.description}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    contact: {
      description: 'Get contact information',
      action: () => (
        <div className="space-y-3">
          <div className="text-cyan-400 text-xl font-bold mb-2">╭─ Contact Information</div>
          <div className="ml-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">📧</span>
              <span className="text-gray-500">Email:</span>
              <a href={`mailto:${person.email}`} className="text-blue-400 hover:underline">
                {person.email}
              </a>
            </div>
            {social.map((item, index) => (
              item.link && (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-yellow-400">🔗</span>
                  <span className="text-gray-500">{item.name}:</span>
                  <a href={item.link} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    {item.name} Profile
                  </a>
                </div>
              )
            ))}
          </div>
        </div>
      )
    },
    clear: {
      description: 'Clear terminal screen',
      action: () => {
        setHistory([]);
        return null;
      }
    },
    work: {
      description: 'Go to projects page',
      action: () => {
        window.location.href = '/work';
        return <div className="text-gray-400">Redirecting to projects page...</div>;
      }
    },
    certifications: {
      description: 'View certifications',
      action: () => {
        window.location.href = '/certifications';
        return <div className="text-gray-400">Redirecting to certifications page...</div>;
      }
    },
    home: {
      description: 'Go to home page',
      action: () => {
        window.location.href = '/';
        return <div className="text-gray-400">Redirecting to home page...</div>;
      }
    },
    whoami: {
      description: 'Display current user',
      action: () => <div className="text-green-400">guest@{person.firstName.toLowerCase()}-portfolio</div>
    },
    date: {
      description: 'Display current date and time',
      action: () => {
        const now = new Date();
        return (
          <div className="text-gray-300">
            <div>{now.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}</div>
            <div className="text-gray-500 text-sm mt-1">Timezone: {person.location}</div>
          </div>
        );
      }
    },
    echo: {
      description: 'Echo a message',
      action: (args: string[]) => <div className="text-gray-300">{args.join(' ')}</div>
    },
    banner: {
      description: 'Display welcome banner',
      action: () => getWelcomeBanner()
    }
  };

  const getWelcomeBanner = () => (
    <div className="space-y-3 mb-6">
      <div className="text-cyan-400 text-xl font-bold">
        ╔═══════════════════════════════════════════════════════╗
      </div>
      <div className="text-center space-y-2">
        <div className="text-cyan-400 text-2xl font-bold">
          Welcome to {person.firstName}'s Portfolio Terminal
        </div>
        <div className="text-gray-400 text-sm">
          {person.role} | {person.location}
        </div>
      </div>
      <div className="text-cyan-400 text-xl font-bold">
        ╚═══════════════════════════════════════════════════════╝
      </div>
      <div className="text-gray-400 mt-4">
        Type <span className="text-green-400 font-semibold">'help'</span> to see available commands
      </div>
      <div className="text-gray-500 text-sm">
        💡 Tip: Use arrow keys to navigate command history, Tab for autocomplete
      </div>
    </div>
  );

  useEffect(() => {
    setHistory([{ type: 'output', content: getWelcomeBanner() }]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = () => {
    if (!input.trim()) return;

    const trimmedInput = input.trim();
    const [command, ...args] = trimmedInput.split(' ');

    setCommandHistory(prev => [...prev, trimmedInput]);
    setHistoryIndex(-1);

    setHistory(prev => [
      ...prev,
      { type: 'input', content: trimmedInput }
    ]);

    if (commands[command]) {
      const output = commands[command].action(args);
      if (output !== null) {
        setHistory(prev => [...prev, { type: 'output', content: output }]);
      }
    } else {
      setHistory(prev => [
        ...prev,
        { 
          type: 'output', 
          content: (
            <div className="text-red-400">
              <div className="flex items-center gap-2">
                <span>❌</span>
                <span>Command not found: <span className="font-mono">{command}</span></span>
              </div>
              <div className="text-gray-500 text-sm mt-1 ml-6">
                Type 'help' for available commands
              </div>
            </div>
          )
        }
      ]);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(commands).filter(cmd => 
        cmd.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      commands.clear.action();
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <Column fillWidth paddingY="0" style={{ minHeight: '100vh', backgroundColor: '#0a0e14' }}>
      <div 
        className="min-h-screen text-green-400 font-mono p-4"
        onClick={handleTerminalClick}
        style={{
          background: 'linear-gradient(135deg, #0a0e14 0%, #111827 100%)',
        }}
      >
        <div 
          ref={terminalRef}
          className="max-w-5xl mx-auto rounded-lg shadow-2xl overflow-hidden"
          style={{ 
            boxShadow: '0 0 40px rgba(34, 211, 238, 0.4), 0 0 80px rgba(34, 211, 238, 0.2)',
            minHeight: '85vh',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
          }}
        >
          {/* Terminal Header */}
          <div className="px-4 py-3 flex items-center gap-2" style={{
            background: 'linear-gradient(90deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
            borderBottom: '1px solid rgba(34, 211, 238, 0.3)',
          }}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
            </div>
            <div className="text-gray-400 text-sm ml-4 flex items-center gap-2">
              <span className="text-cyan-400">◆</span>
              <span>{person.firstName.toLowerCase()}@portfolio:~$</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 space-y-4">
            {history.map((item, index) => (
              <div key={index}>
                {item.type === 'input' ? (
                  <div className="flex gap-2 items-center">
                    <span className="text-green-400 flex items-center gap-2">
                      <span className="text-cyan-400">◆</span>
                      guest@portfolio:~$
                    </span>
                    <span className="text-white">{item.content}</span>
                  </div>
                ) : (
                  <div className="text-gray-300 ml-6 my-3">{item.content}</div>
                )}
              </div>
            ))}

            {/* Input Line */}
            <div className="flex gap-2 items-center">
              <span className="text-green-400 flex items-center gap-2">
                <span className="text-cyan-400 animate-pulse">◆</span>
                guest@portfolio:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white caret-green-400"
                autoFocus
                spellCheck={false}
                style={{
                  textShadow: '0 0 5px rgba(74, 222, 128, 0.5)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="max-w-5xl mx-auto mt-4 text-center text-gray-600 text-sm space-y-1">
          <div>Press <kbd className="px-2 py-1 bg-gray-800 rounded text-cyan-400">Tab</kbd> for autocomplete • <kbd className="px-2 py-1 bg-gray-800 rounded text-cyan-400">↑↓</kbd> for history • <kbd className="px-2 py-1 bg-gray-800 rounded text-cyan-400">Ctrl+L</kbd> to clear</div>
        </div>
      </div>
    </Column>
  );
};

export default CLIPage;