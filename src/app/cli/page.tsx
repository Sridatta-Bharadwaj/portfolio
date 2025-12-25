"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Column } from "@once-ui-system/core";

const CLIPage = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{type: string, content: any}>>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, any> = {
    help: {
      description: 'Show available commands',
      action: () => {
        return (
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold">Available Commands:</div>
            {Object.entries(commands).map(([cmd, info]) => (
              <div key={cmd} className="ml-4">
                <span className="text-green-400">{cmd}</span>
                <span className="text-gray-400"> - {info.description}</span>
              </div>
            ))}
          </div>
        );
      }
    },
    about: {
      description: 'Learn about me',
      action: () => (
        <div className="space-y-2">
          <div className="text-cyan-400 font-bold">About Sridatta Bharadwaj Parupudi</div>
          <div className="text-gray-300 ml-4">
            <p>🎓 Computer Science Student at Amrita Vishwa Vidyapeetham, Chennai</p>
            <p>💻 Passionate about algorithms, problem-solving, and software development</p>
            <p>📍 Location: Asia/Kolkata</p>
            <p>🗣️ Languages: English, Telugu, Hindi</p>
            <p className="mt-2">I enjoy breaking down complex ideas into simple explanations</p>
            <p>and building practical software solutions.</p>
          </div>
        </div>
      )
    },
    skills: {
      description: 'View technical skills',
      action: () => (
        <div className="space-y-2">
          <div className="text-cyan-400 font-bold">Technical Skills</div>
          <div className="ml-4 space-y-1">
            <div><span className="text-yellow-400">▸</span> Programming: Python, JavaScript, Java, C++</div>
            <div><span className="text-yellow-400">▸</span> Web: React, Next.js, HTML, CSS, Tailwind</div>
            <div><span className="text-yellow-400">▸</span> Tools: Git, Figma, VS Code</div>
            <div><span className="text-yellow-400">▸</span> Concepts: Algorithms, Data Structures, Statistics</div>
          </div>
        </div>
      )
    },
    projects: {
      description: 'List my projects',
      action: () => (
        <div className="space-y-3">
          <div className="text-cyan-400 font-bold">Projects</div>
          <div className="ml-4 space-y-3">
            <div className="border-l-2 border-green-400 pl-3">
              <div className="text-green-400 font-semibold">Once UI Design System</div>
              <div className="text-gray-400 text-sm">Building a customizable design system with Next.js and Figma</div>
            </div>
            <div className="border-l-2 border-blue-400 pl-3">
              <div className="text-blue-400 font-semibold">Figma to Code Pipeline</div>
              <div className="text-gray-400 text-sm">Automating design handovers with custom tooling</div>
            </div>
            <div className="text-gray-500 text-sm mt-2">
              Type 'work' to view in traditional format
            </div>
          </div>
        </div>
      )
    },
    contact: {
      description: 'Get contact information',
      action: () => (
        <div className="space-y-2">
          <div className="text-cyan-400 font-bold">Contact Information</div>
          <div className="ml-4 space-y-1">
            <div>📧 Email: sridatta.bharadwaj2006@gmail.com</div>
            <div>💼 LinkedIn: <a href="https://www.linkedin.com/in/sridatta-bharadwaj-p-730147327/" className="text-blue-400 hover:underline">Profile</a></div>
            <div>🐙 GitHub: <a href="https://github.com/Sridatta-Bharadwaj" className="text-blue-400 hover:underline">@Sridatta-Bharadwaj</a></div>
            <div>📸 Instagram: <a href="https://www.instagram.com/sridatta_07/" className="text-blue-400 hover:underline">@sridatta_07</a></div>
          </div>
        </div>
      )
    },
    education: {
      description: 'View education background',
      action: () => (
        <div className="space-y-2">
          <div className="text-cyan-400 font-bold">Education</div>
          <div className="ml-4 space-y-2">
            <div>
              <div className="text-green-400">🎓 Amrita Vishwa Vidyapeetham</div>
              <div className="text-gray-400 text-sm ml-4">B.Tech in CSE with Minor in AI & ML</div>
            </div>
            <div>
              <div className="text-green-400">📚 Sri Vasistha Jr College</div>
              <div className="text-gray-400 text-sm ml-4">Intermediate (Class 11-12)</div>
            </div>
            <div>
              <div className="text-green-400">🏫 Matrusri DAV Public School</div>
              <div className="text-gray-400 text-sm ml-4">Class 1-10</div>
            </div>
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
    home: {
      description: 'Go to home page',
      action: () => {
        window.location.href = '/';
        return <div className="text-gray-400">Redirecting to home page...</div>;
      }
    },
    whoami: {
      description: 'Display current user',
      action: () => <div className="text-green-400">guest@sridatta-portfolio</div>
    },
    date: {
      description: 'Display current date and time',
      action: () => <div className="text-gray-300">{new Date().toString()}</div>
    },
    echo: {
      description: 'Echo a message',
      action: (args: string[]) => <div className="text-gray-300">{args.join(' ')}</div>
    }
  };

  useEffect(() => {
    const welcomeMessage = (
      <div className="space-y-3 mb-6">
        <div className="text-cyan-400 text-xl font-bold">
          ╔═══════════════════════════════════════════════════════╗
        </div>
        <div className="text-center text-cyan-400 text-2xl font-bold">
          Welcome to Sridatta's Portfolio Terminal
        </div>
        <div className="text-cyan-400 text-xl font-bold">
          ╚═══════════════════════════════════════════════════════╝
        </div>
        <div className="text-gray-400 mt-4">
          Type <span className="text-green-400 font-semibold">'help'</span> to see available commands
        </div>
        <div className="text-gray-500 text-sm">
          Tip: Use arrow keys to navigate command history
        </div>
      </div>
    );
    setHistory([{ type: 'output', content: welcomeMessage }]);
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
              Command not found: {command}
              <div className="text-gray-500 text-sm mt-1">
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
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <Column fillWidth paddingY="0" style={{ minHeight: '100vh', backgroundColor: '#111827' }}>
      <div 
        className="min-h-screen bg-gray-900 text-green-400 font-mono p-4"
        onClick={handleTerminalClick}
      >
        <div 
          ref={terminalRef}
          className="max-w-4xl mx-auto bg-black rounded-lg shadow-2xl overflow-hidden"
          style={{ 
            boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
            minHeight: '80vh',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-sm ml-4">
              sridatta@portfolio:~$
            </div>
          </div>

          <div className="p-6 space-y-4">
            {history.map((item, index) => (
              <div key={index}>
                {item.type === 'input' ? (
                  <div className="flex gap-2">
                    <span className="text-green-400">guest@portfolio:~$</span>
                    <span className="text-white">{item.content}</span>
                  </div>
                ) : (
                  <div className="text-gray-300 ml-6">{item.content}</div>
                )}
              </div>
            ))}

            <div className="flex gap-2">
              <span className="text-green-400">guest@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white caret-green-400"
                autoFocus
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-4 text-center text-gray-600 text-sm">
          Press Tab for autocomplete • Arrow keys for history • Enter to execute
        </div>
      </div>
    </Column>
  );
};

export default CLIPage;