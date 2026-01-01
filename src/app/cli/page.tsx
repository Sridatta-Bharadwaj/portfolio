"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Column } from "@once-ui-system/core";
import { person, social, work, studies, skills } from "@/resources";

const CLIPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Add scrollbar styles dynamically
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .cli-terminal::-webkit-scrollbar {
        width: 8px;
      }
      .cli-terminal::-webkit-scrollbar-track {
        background: transparent;
      }
      .cli-terminal::-webkit-scrollbar-thumb {
        background: var(--neutral-on-background-weak);
        border-radius: 4px;
        border: 2px solid var(--page-background);
      }
      .cli-terminal::-webkit-scrollbar-thumb:hover {
        background: var(--neutral-on-background);
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
    
    // Detect mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.head.removeChild(style);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Color palette from Once-UI design system
  const colors = {
    brand: 'var(--brand-on-background)',
    brandWeak: 'var(--brand-on-background-weak)',
    accent: 'var(--accent-on-background)',
    accentWeak: 'var(--accent-on-background-weak)',
    neutral: 'var(--neutral-on-background)',
    neutralWeak: 'var(--neutral-on-background-weak)',
    neutralAlpha: 'var(--neutral-alpha-medium)',
    background: 'var(--page-background)',
    backgroundContent: 'var(--background-surface)',
    border: 'var(--neutral-alpha-weak)',
  };
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: string, content: any }>>([]);
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
            <div style={{ color: colors.brand, fontWeight: 'bold', marginBottom: '1rem' }}>Available Commands:</div>
            {Object.entries(commands).map(([cmd, info]) => (
              <div key={cmd} className="ml-4 flex items-start gap-3 group hover:translate-x-2 transition-transform">
                <span style={{ color: colors.accent, fontFamily: 'monospace', minWidth: '120px' }}>{cmd}</span>
                <span style={{ color: colors.neutralWeak }}>→</span>
                <span style={{ color: colors.neutralWeak }} className="group-hover:opacity-100 transition-opacity">{info.description}</span>
              </div>
            ))}
          </div>
        );
      }
    },
    skills: {
      description: 'View technical skills',
      action: () => (
        <div className="space-y-3">
          <div style={{ color: colors.brand, fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>╭─ Technical Skills</div>
          <div style={{ marginLeft: '1rem' }} className="space-y-3">
            {skills.map((skill: any, index: number) => (
              <div key={index} className="space-y-2" style={{ borderLeft: `2px solid ${colors.neutralAlpha}`, paddingLeft: '1rem' }}>
                <div style={{ color: colors.accent, fontWeight: 'semibold' }}>{skill.title}</div>
                {skill.description && (
                  <div style={{ color: colors.neutralWeak, fontSize: '0.875rem' }}>{skill.description}</div>
                )}
                {skill.tags && skill.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {skill.tags.map((tag: any, i: number) => (
                      <span key={i} style={{ fontSize: '0.75rem', backgroundColor: colors.backgroundContent, color: colors.neutral, padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
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
          <div style={{ color: colors.brand, fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>╭─ Work Experience</div>
          <div style={{ marginLeft: '1rem' }} className="space-y-4">
            <div style={{ color: colors.neutralWeak, fontSize: '0.875rem', padding: '1rem', backgroundColor: colors.backgroundContent, borderRadius: '0.5rem' }}>
              Coming soon! Work experience section will be available soon.
            </div>
          </div>
        </div>
      )
    },
    education: {
      description: 'View education background',
      action: () => (
        <div className="space-y-3">
          <div style={{ color: colors.brand, fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>╭─ Education</div>
          <div style={{ marginLeft: '1rem' }} className="space-y-3">
            {studies.map((inst: any, index: number) => (
              <div key={index} style={{ borderLeft: `2px solid ${colors.neutralAlpha}`, paddingLeft: '1rem' }}>
                <div style={{ color: colors.accent, fontWeight: 'semibold' }}>{inst.name}</div>
                <div style={{ color: colors.neutralWeak, fontSize: '0.875rem', marginTop: '0.25rem' }}>{inst.description}</div>
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
          <div style={{ color: colors.brand, fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>╭─ Contact Information</div>
          <div style={{ marginLeft: '1rem' }} className="space-y-2">
            <div className="flex items-center gap-2">
              <span>📧</span>
              <span style={{ color: colors.neutralWeak }}>Email:</span>
              <a href={`mailto:${person.email}`} style={{ color: colors.brand }} className="hover:underline">
                {person.email}
              </a>
            </div>
            {social.map((item, index) => (
              item.link && (
                <div key={index} className="flex items-center gap-2">
                  <span>🔗</span>
                  <span style={{ color: colors.neutralWeak }}>{item.name}:</span>
                  <a href={item.link} style={{ color: colors.brand }} className="hover:underline" target="_blank" rel="noopener noreferrer">
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
        setHistory([{ type: 'output', content: getWelcomeBanner() }]);
        return null;
      }
    },
    work: {
      description: 'Go to projects page',
      action: () => {
        window.location.href = '/work';
        return <div style={{ color: colors.neutralWeak }}>Redirecting to projects page...</div>;
      }
    },
    certifications: {
      description: 'View certifications',
      action: () => {
        window.location.href = '/certifications';
        return <div style={{ color: colors.neutralWeak }}>Redirecting to certifications page...</div>;
      }
    },
    home: {
      description: 'Go to home page',
      action: () => {
        window.location.href = '/';
        return <div style={{ color: colors.neutralWeak }}>Redirecting to home page...</div>;
      }
    },
    whoami: {
      description: 'Display current user',
      action: () => <div style={{ color: colors.accent }}>guest@{person.firstName.toLowerCase()}-portfolio</div>
    },
    date: {
      description: 'Display current date and time',
      action: () => {
        const now = new Date();
        return (
          <div style={{ color: colors.neutral }}>
            <div>{now.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}</div>
            <div style={{ color: colors.neutralWeak, fontSize: '0.875rem', marginTop: '0.25rem' }}>Timezone: {person.location}</div>
          </div>
        );
      }
    },
    echo: {
      description: 'Echo a message',
      action: (args: string[]) => <div style={{ color: colors.neutral }}>{args.join(' ')}</div>
    },
    gui: {
      description: 'Switch to GUI portfolio',
      action: () => {
        window.location.href = '/';
        return <div style={{ color: colors.neutralWeak }}>Switching to GUI portfolio...</div>;
      }
    },
    banner: {
      description: 'Display welcome banner',
      action: () => getWelcomeBanner()
    }
  };

  const getWelcomeBanner = () => (
    <div style={{ marginBottom: '1.5rem' }}>
      {/* Decorative Top Line */}
      <div style={{
        height: '2px',
        background: `linear-gradient(90deg, transparent 0%, ${colors.brand} 20%, ${colors.brand} 80%, transparent 100%)`,
        marginBottom: '1rem'
      }} />

      {/* Main Content */}
      <div style={{ marginLeft: '0.5rem' }}>
        {/* Greeting - Name */}
        <div style={{
          fontSize: '2rem',
          fontWeight: '900',
          marginBottom: '0.1rem',
          color: colors.brand,
          letterSpacing: '-0.5px'
        }}>
          ▶ {person.firstName}'s Portfolio
        </div>

        {/* Subtitle with role */}
        <div style={{
          fontSize: '0.95rem',
          color: colors.accent,
          fontWeight: '600',
          marginBottom: '0.75rem',
          letterSpacing: '0.5px'
        }}>
        </div>

        {/* Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '0.5rem',
          marginBottom: '1rem',
          padding: '0.75rem',
          background: `${colors.brand}08`,
          borderLeft: `3px solid ${colors.accent}`,
          borderRadius: '0.25rem'
        }}>
          <div style={{ color: colors.accent, fontWeight: 'bold' }}>📍</div>
          <div><div style={{ color: colors.neutral, fontWeight: '500', fontSize: '0.9rem' }}>Location</div><div style={{ color: colors.neutralWeak, fontSize: '0.8rem' }}>{person.location}</div></div>

          <div style={{ color: colors.accent, fontWeight: 'bold' }}>✦</div>
          <div><div style={{ color: colors.neutral, fontWeight: '500', fontSize: '0.9rem' }}>Role</div><div style={{ color: colors.neutralWeak, fontSize: '0.8rem' }}>{person.role}</div></div>
        </div>
      </div>

      {/* Quick Commands Section */}
      <div style={{
        padding: '0.75rem',
        background: `${colors.accent}08`,
        borderLeft: `3px solid ${colors.brand}`,
        borderRadius: '0.25rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          color: colors.brand,
          fontSize: '0.8rem',
          fontWeight: '600',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          ↳ Quick Start
        </div>
        <div style={{
          color: colors.neutral,
          fontSize: '0.8rem',
          lineHeight: '1.4',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem'
        }}>
          <div><span style={{ color: colors.accent, fontWeight: 'bold' }}>help</span> — List all commands</div>
          <div><span style={{ color: colors.accent, fontWeight: 'bold' }}>skills</span> — My skills</div>
          <div><span style={{ color: colors.accent, fontWeight: 'bold' }}>work</span> — View portfolio</div>
          <div><span style={{ color: colors.accent, fontWeight: 'bold' }}>education</span> — Education</div>
        </div>
      </div>

      {/* Tips Section */}
      <div style={{
        color: colors.neutralWeak,
        fontSize: '0.75rem',
        padding: '0.5rem',
        borderTop: `1px solid ${colors.brand}20`,
        borderBottom: `1px solid ${colors.brand}20`
      }}>
        <span style={{ color: colors.accent }}>💡</span> Use <span style={{ color: colors.accent, fontWeight: 'bold' }}>↑↓</span> arrows for history • <span style={{ color: colors.accent, fontWeight: 'bold' }}>Tab</span> for autocomplete • <span style={{ color: colors.accent, fontWeight: 'bold' }}>clear</span> to reset
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
            <div style={{ color: colors.accent }}>
              <div className="flex items-center gap-2">
                <span>❌</span>
                <span>Command not found: <span style={{ fontFamily: 'monospace' }}>{command}</span></span>
              </div>
              <div style={{ color: colors.neutralWeak, fontSize: '0.875rem', marginTop: '0.25rem', marginLeft: '1.5rem' }}>
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
    <div
      className="font-mono"
      onClick={handleTerminalClick}
      style={{
        color: colors.neutral,
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      {/* Terminal Content Area */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto cli-terminal"
        style={{
          padding: isMobile ? '1rem' : '2rem',
          backgroundColor: colors.background,
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.neutralWeak} transparent`,
        }}
      >
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            {item.type === 'input' ? (
              <div className="flex gap-2 items-center">
                <span style={{ color: colors.accent }}>{person.firstName.toLowerCase()}@portfolio:~$</span>
                <span style={{ color: colors.neutral }}>{item.content}</span>
              </div>
            ) : (
              <div style={{ color: colors.neutral, marginLeft: '0' }}>{item.content}</div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area with Border */}
      <div
        style={{
          borderTop: `1px solid ${colors.brand}`,
          padding: isMobile ? '0.75rem 1rem' : '1rem 2rem',
          backgroundColor: colors.background,
        }}
      >
        <div className={isMobile ? 'flex items-center' : 'flex gap-2 items-center'} style={{ marginBottom: '0.5rem', gap: isMobile ? '0.25rem' : undefined }}>
          <span style={{ color: colors.accent, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {isMobile ? '$' : `${person.firstName.toLowerCase()}@portfolio:~$`}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              minWidth: 0,
              backgroundColor: 'transparent',
              outline: 'none',
              color: colors.neutral,
              fontFamily: 'monospace',
              caretColor: colors.accent,
              border: 'none',
              fontSize: '1rem',
            }}
            autoFocus
            spellCheck={false}
          />
        </div>
        <div style={{ color: colors.neutralWeak, fontSize: '0.875rem' }}>
          Type 'help' to list available commands
        </div>
      </div>
    </div>
  );
};

export default CLIPage;