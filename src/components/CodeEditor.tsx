'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';

// Type for code segments
type CodeSegment = { text: string; color: string };

// 3 code variations: Companies, Projects, Education
const codeVariations: { code: CodeSegment[]; filename: string }[] = [
  // Variation 1: Companies/Experience
  {
    filename: 'experience.ts',
    code: [
      { text: '// +10 years of experience', color: 'text-gray-500' },
      { text: '\n', color: 'text-gray-300' },
      { text: 'const ', color: 'text-purple-400' },
      { text: 'companies', color: 'text-yellow-300' },
      { text: ' = [', color: 'text-gray-300' },
      { text: '\n  ', color: 'text-gray-300' },
      { text: '"Media.Monks"', color: 'text-orange-300' },
      { text: ',', color: 'text-gray-300' },
      { text: '\n  ', color: 'text-gray-300' },
      { text: '"Hoitsu"', color: 'text-orange-300' },
      { text: ',', color: 'text-gray-300' },
      { text: '\n  ', color: 'text-gray-300' },
      { text: '"Comfama"', color: 'text-orange-300' },
      { text: ',', color: 'text-gray-300' },
      { text: '\n  ', color: 'text-gray-300' },
      { text: '"IT Globers"', color: 'text-orange-300' },
      { text: ',', color: 'text-gray-300' },
      { text: '\n  ', color: 'text-gray-300' },
      { text: '"Indra"', color: 'text-orange-300' },
      { text: ',', color: 'text-gray-300' },
      { text: '\n  ', color: 'text-gray-300' },
      { text: '"ParqueSoft"', color: 'text-orange-300' },
      { text: '\n];', color: 'text-gray-300' },
    ],
  },
  // Variation 2: Projects
  {
    filename: 'projects.ts',
    code: [
      { text: 'const ', color: 'text-purple-400' },
      { text: 'projects', color: 'text-yellow-300' },
      { text: ' = [', color: 'text-gray-300' },
      { text: '\n  { ', color: 'text-gray-300' },
      { text: 'name', color: 'text-blue-300' },
      { text: ': ', color: 'text-gray-300' },
      { text: '"DITU Streaming"', color: 'text-orange-300' },
      { text: ',', color: 'text-gray-300' },
      { text: '\n    ', color: 'text-gray-300' },
      { text: 'tech', color: 'text-blue-300' },
      { text: ': [', color: 'text-gray-300' },
      { text: '"SolidJS"', color: 'text-green-400' },
      { text: ', ', color: 'text-gray-300' },
      { text: '"Tizen"', color: 'text-green-400' },
      { text: '] },', color: 'text-gray-300' },
      { text: '\n  { ', color: 'text-gray-300' },
      { text: 'name', color: 'text-blue-300' },
      { text: ': ', color: 'text-gray-300' },
      { text: '"BPMN Editor"', color: 'text-orange-300' },
      { text: ',', color: 'text-gray-300' },
      { text: '\n    ', color: 'text-gray-300' },
      { text: 'tech', color: 'text-blue-300' },
      { text: ': [', color: 'text-gray-300' },
      { text: '"Next.js"', color: 'text-green-400' },
      { text: ', ', color: 'text-gray-300' },
      { text: '"GraphQL"', color: 'text-green-400' },
      { text: '] },', color: 'text-gray-300' },
      { text: '\n  { ', color: 'text-gray-300' },
      { text: 'name', color: 'text-blue-300' },
      { text: ': ', color: 'text-gray-300' },
      { text: '"Tigo E-commerce"', color: 'text-orange-300' },
      { text: ',', color: 'text-gray-300' },
      { text: '\n    ', color: 'text-gray-300' },
      { text: 'tech', color: 'text-blue-300' },
      { text: ': [', color: 'text-gray-300' },
      { text: '"jQuery"', color: 'text-green-400' },
      { text: ', ', color: 'text-gray-300' },
      { text: '"CSS"', color: 'text-green-400' },
      { text: '] },', color: 'text-gray-300' },
      { text: '\n  { ', color: 'text-gray-300' },
      { text: 'name', color: 'text-blue-300' },
      { text: ': ', color: 'text-gray-300' },
      { text: '"PQRD System"', color: 'text-orange-300' },
      { text: ',', color: 'text-gray-300' },
      { text: '\n    ', color: 'text-gray-300' },
      { text: 'tech', color: 'text-blue-300' },
      { text: ': [', color: 'text-gray-300' },
      { text: '"ProcessMaker"', color: 'text-green-400' },
      { text: '] }', color: 'text-gray-300' },
      { text: '\n];', color: 'text-gray-300' },
    ],
  },
  // Variation 3: Education with while loop
  {
    filename: 'learning.ts',
    code: [
      { text: '// Formal Education', color: 'text-gray-500' },
      { text: '\n', color: 'text-gray-300' },
      { text: 'const ', color: 'text-purple-400' },
      { text: 'degrees', color: 'text-yellow-300' },
      { text: ' = [', color: 'text-gray-300' },
      { text: '\n  ', color: 'text-gray-300' },
      { text: '"Ing. Sistemas - U. Nariño"', color: 'text-orange-300' },
      { text: ',', color: 'text-gray-300' },
      { text: '\n  ', color: 'text-gray-300' },
      { text: '"BPM Architect - ProcessMaker"', color: 'text-orange-300' },
      { text: ',', color: 'text-gray-300' },
      { text: '\n  ', color: 'text-gray-300' },
      { text: '"Platzi Master"', color: 'text-orange-300' },
      { text: '\n];', color: 'text-gray-300' },
      { text: '\n\n', color: 'text-gray-300' },
      { text: '// Never stop learning', color: 'text-gray-500' },
      { text: '\n', color: 'text-gray-300' },
      { text: 'while ', color: 'text-purple-400' },
      { text: '(', color: 'text-gray-300' },
      { text: 'true', color: 'text-purple-400' },
      { text: ') {', color: 'text-gray-300' },
      { text: '\n  ', color: 'text-gray-300' },
      { text: 'learn', color: 'text-yellow-300' },
      { text: '(', color: 'text-gray-300' },
      { text: 'newTechnology', color: 'text-blue-300' },
      { text: ');', color: 'text-gray-300' },
      { text: '\n}', color: 'text-gray-300' },
    ],
  },
];

// Claude mascot pixel art component
const ClaudeMascot = () => (
  <div className="text-[#d97757] font-mono text-center leading-none text-xs sm:text-sm">
    <pre className="inline-block">
{`   ██████
  ██    ██
 ██ ▀  ▀ ██
 ██  ▄▄  ██
  ████████
    ████`}
    </pre>
  </div>
);

interface CodeEditorProps {
  isInView: boolean;
  className?: string;
}

export function CodeEditor({ isInView, className = '' }: CodeEditorProps) {
  const [displayedSegments, setDisplayedSegments] = useState<CodeSegment[]>([]);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  // Use refs for timer cleanup
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Select a random variation when cycleKey changes
  const currentVariation = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * codeVariations.length);
    return codeVariations[randomIndex];
  }, [cycleKey]);

  const codeLines = currentVariation.code;
  const filename = currentVariation.filename;

  // Typing animation effect
  useEffect(() => {
    if (!isInView) return;

    if (currentSegmentIndex >= codeLines.length) {
      setIsTypingComplete(true);
      return;
    }

    const currentSegment = codeLines[currentSegmentIndex];
    const typingSpeed = 35; // ms per character

    // Clear any existing timer
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }

    typingTimerRef.current = setTimeout(() => {
      if (currentCharIndex < currentSegment.text.length) {
        setDisplayedSegments((prev) => {
          const newSegments = [...prev];
          if (newSegments.length === currentSegmentIndex) {
            newSegments.push({ text: currentSegment.text[0], color: currentSegment.color });
          } else {
            newSegments[currentSegmentIndex] = {
              text: currentSegment.text.slice(0, currentCharIndex + 1),
              color: currentSegment.color,
            };
          }
          return newSegments;
        });
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        setCurrentSegmentIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }, typingSpeed);

    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [isInView, currentSegmentIndex, currentCharIndex, codeLines]);

  // Restart animation after 6 seconds when typing is complete
  useEffect(() => {
    if (!isTypingComplete) return;

    // Clear any existing timer
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
    }

    restartTimerRef.current = setTimeout(() => {
      setDisplayedSegments([]);
      setCurrentSegmentIndex(0);
      setCurrentCharIndex(0);
      setIsTypingComplete(false);
      setCycleKey((k) => k + 1); // Trigger new random variation
    }, 6000);

    return () => {
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
        restartTimerRef.current = null;
      }
    };
  }, [isTypingComplete]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    };
  }, []);

  // Count lines for line numbers
  const lineCount = displayedSegments
    .map((s) => s.text)
    .join('')
    .split('\n').length;

  return (
    <div className={`w-full ${className}`}>
      {/* Editor window */}
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 bg-[#1e1e1e]">
        {/* Title bar */}
        <div className="bg-[#323233] px-4 py-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-[#27ca3f] hover:bg-[#27ca3f]/80 transition-colors" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-gray-400 text-sm font-mono">{filename}</span>
          </div>
          <div className="w-14" /> {/* Spacer for symmetry */}
        </div>

        {/* Code area */}
        <div className="p-4 sm:p-6 font-mono text-sm sm:text-base min-h-[180px] sm:min-h-[200px]">
          <div className="flex">
            {/* Line numbers */}
            <div className="text-gray-600 text-right pr-4 select-none leading-relaxed border-r border-gray-700/50 mr-4">
              {Array.from({ length: Math.max(lineCount, 8) }, (_, i) => (
                <div key={i + 1} className="h-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code content */}
            <div className="flex-1 leading-relaxed whitespace-pre overflow-x-auto">
              {displayedSegments.map((segment, index) => (
                <span key={index} className={segment.color}>
                  {segment.text}
                </span>
              ))}
              {/* Blinking cursor */}
              <motion.span
                className={`inline-block w-2 h-5 ml-0.5 align-middle ${
                  isTypingComplete ? 'bg-green-400' : 'bg-white'
                }`}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            </div>
          </div>
        </div>

        {/* Terminal tabs bar */}
        <div className="bg-[#252526] border-t border-gray-700/50 px-2 flex items-center">
          <div className="flex text-xs">
            <span className="px-3 py-1.5 text-gray-500">Problems</span>
            <span className="px-3 py-1.5 text-gray-500">Output</span>
            <span className="px-3 py-1.5 text-white border-b-2 border-[#d97757]">Terminal</span>
          </div>
        </div>

        {/* Claude Code Terminal Panel */}
        <div className="bg-[#1e1e1e] border-t border-gray-700/50 p-3 font-mono text-xs sm:text-sm">
          {/* Terminal prompt */}
          <div className="text-gray-400 mb-2">
            <span className="text-gray-500">❯ </span>
            <span className="text-[#d97757]">claude</span>
          </div>

          {/* Claude Code Box */}
          <div className="border border-dashed border-[#d97757] rounded mx-2">
            {/* Header */}
            <div className="text-[#d97757] text-xs px-3 py-1 border-b border-dashed border-[#d97757]">
              ── Claude Code v2.1.11 ──
            </div>

            {/* Content - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
              {/* Left column - Welcome */}
              <div className="text-center">
                <p className="text-gray-200 text-sm mb-2">Welcome back Lennin!</p>
                <ClaudeMascot />
                <div className="text-xs text-gray-400 mt-2 space-y-0.5">
                  <p>
                    <span className="text-[#d97757]">Opus 4.5</span>
                    <span className="text-gray-500"> · </span>
                    <span className="text-gray-300">Claude Max</span>
                  </p>
                  <p className="text-gray-500">ing.lenninibarra@gmail.com</p>
                  <p className="text-gray-500">~/Documentos/cv/portafolio2026</p>
                </div>
              </div>

              {/* Right column - Tips & Activity */}
              <div className="border-t md:border-t-0 md:border-l border-gray-700/50 pt-3 md:pt-0 md:pl-4">
                <div className="mb-3">
                  <h4 className="text-[#5fd7d7] text-xs font-semibold mb-1">
                    Tips for getting started
                  </h4>
                  <p className="text-gray-400 text-xs">
                    Run <span className="text-[#d97757]">/init</span> to create a CLAUDE.md file
                  </p>
                </div>

                <div>
                  <h4 className="text-[#5fd7d7] text-xs font-semibold mb-1">
                    Recent activity
                  </h4>
                  <p className="text-gray-500 text-xs">
                    No <span className="text-[#5fd7d7]">recent activity</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Command suggestion */}
          <div className="text-gray-500 text-xs mt-2 ml-2">
            <span className="text-gray-600">❯</span> Try &quot;edit {filename} to...&quot;
          </div>
        </div>
      </div>
    </div>
  );
}
