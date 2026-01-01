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
      /* Modern terminal container + caret */
      @keyframes blinkCaret {
        0%, 50% { opacity: 1 }
        50.1%, 100% { opacity: 0 }
      }
      .terminal-wrap {
        max-width: 980px;
        margin: 48px auto;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(2,6,23,0.45);
        overflow: hidden;
        backdrop-filter: blur(6px) saturate(120%);
        border: 1px solid var(--neutral-alpha-weak);
      }
      .terminal-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: linear-gradient(180deg, var(--background-surface)cc, transparent);
        border-bottom: 1px solid var(--neutral-alpha-weak);
      }
      .header-dots { display:flex; gap:8px; }
      .header-dot { width:12px; height:12px; border-radius:999px; }
      .dot-close { background: linear-gradient(90deg, #ff7b7b, #ff5252); }
      .dot-min { background: linear-gradient(90deg, #ffd27f, #ffb84d); }
      .dot-max { background: linear-gradient(90deg, #7bff9a, #2dd36f); }
      .terminal-body { padding: 20px; background: var(--page-background); }
      .input-pill { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:10px; background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border:1px solid var(--neutral-alpha-weak); }
      .cli-suggestion { padding:6px 10px; border-radius:8px; cursor:pointer; }
      .cli-suggestion:hover { transform:translateX(6px); }
      .caret { width:8px; height:18px; background: var(--accent-on-background); display:inline-block; margin-left:6px; animation: blinkCaret 1s infinite; }
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

  const [suggestions, setSuggestions] = useState<string[]>([]);

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
      const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length > 0) {
        setInput(matches[0]);
        setSuggestions([]);
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
    <div className="font-mono" style={{ backgroundColor: colors.background, minHeight: '100vh', padding: isMobile ? '12px' : '24px' }} onClick={handleTerminalClick}>
      <div className="terminal-wrap" role="region" aria-label="CLI portfolio">
        <div className="terminal-header">
          <div className="header-dots">
            <div className="header-dot dot-close" title="Close" />
            <div className="header-dot dot-min" title="Minimise" />
            <div className="header-dot dot-max" title="Maximise" />
          </div>
          <div style={{ color: colors.neutralWeak, fontSize: '0.9rem', marginLeft: 8 }}>{person.firstName}'s CLI</div>
          <div style={{ marginLeft: 'auto', color: colors.neutralWeak, fontSize: '0.85rem' }}>{new Date().toLocaleDateString()}</div>
        </div>

        <div className="terminal-body">
          <div ref={terminalRef} className="cli-terminal" style={{ maxHeight: '64vh', overflowY: 'auto', paddingRight: 8 }}>
            {history.map((item, index) => (
              <div key={index} style={{ marginBottom: 12 }}>
                {item.type === 'input' ? (
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ color: colors.accent, fontFamily: 'monospace' }}>{`${person.firstName.toLowerCase()}@portfolio:~$`}</div>
                    <div style={{ color: colors.neutral, fontFamily: 'monospace' }}>{item.content}</div>
                  </div>
                ) : (
                  <div style={{ color: colors.neutral }}>{item.content}</div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            <div className="input-pill">
              <div style={{ color: colors.accent, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{`${person.firstName.toLowerCase()}@portfolio:~$`}</div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  const v = e.target.value;
                  setInput(v);
                  if (!v) { setSuggestions([]); return; }
                  const matches = Object.keys(commands).filter(cmd => cmd.startsWith(v.toLowerCase())).slice(0,6);
                  setSuggestions(matches);
                }}
                onKeyDown={handleKeyDown}
                style={{ flex: 1, minWidth: 0, background: 'transparent', outline: 'none', color: colors.neutral, fontFamily: 'monospace', caretColor: colors.accent, border: 'none', fontSize: '1rem' }}
                autoFocus
                spellCheck={false}
              />
              <div style={{ width: 24 }} aria-hidden>
                <span className="caret" />
              </div>
            </div>

            {suggestions.length > 0 && (
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                {suggestions.map(s => (
                  <div key={s} className="cli-suggestion" onClick={() => { setInput(s); setSuggestions([]); inputRef.current?.focus(); }} style={{ background: colors.backgroundContent, color: colors.neutral, padding: '6px 10px', borderRadius: 8, border: `1px solid ${colors.border}` }}>{s}</div>
                ))}
              </div>
            )}

            <div style={{ color: colors.neutralWeak, fontSize: '0.85rem', marginTop: 10 }}>Type 'help' to list commands • Press <span style={{ color: colors.accent }}>Tab</span> to autocomplete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CLIPage;