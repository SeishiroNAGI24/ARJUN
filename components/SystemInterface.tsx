import React, { useState } from 'react';

interface SystemInterfaceProps {
  onCommand: (prompt: string) => Promise<void>;
  response: string;
  isLoading: boolean;
}

// A simple markdown parser to convert response text to HTML for rich display.
const parseMarkdown = (text: string) => {
    // Escape HTML to prevent XSS
    let safeText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    let html = safeText
        // Code blocks (```...```)
        .replace(/```([\s\S]*?)```/g, (_match, code) => `<pre class="bg-gray-800 p-4 rounded-md border border-gray-700 my-4 text-sm text-gray-200 overflow-x-auto"><code>${code.trim()}</code></pre>`)
        // Headings (## ...)
        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-purple-400 mt-4 mb-2">$1</h2>')
        // Headings (# ...)
        .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-purple-400 mt-6 mb-3">$1</h1>')
        // Bold (**...**)
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
        // List items (- ...)
        .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
        // Newlines to <br>
        .replace(/\n/g, '<br />');

    // Wrap consecutive list items in <ul>
    html = html.replace(/(<li.*<\/li>)/gs, '<ul>$1</ul>').replace(/<\/ul><br \/><ul>/g, '');

    return html;
};

const SystemInterface: React.FC<SystemInterfaceProps> = ({ onCommand, response, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onCommand(prompt);
    // Do not clear prompt, so user can see what they asked
  };

  return (
    <div>
      <h3 className="text-3xl font-bold text-purple-400 mb-6">System Command</h3>
      <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Command the System... (e.g., 'Generate a hard quest about React hooks')"
            className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder:text-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="px-6 py-3 font-bold rounded-md transition-colors disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Execute Command'}
          </button>
        </form>

        {(isLoading || response) && (
          <div className="mt-6 p-6 bg-gray-800/70 border border-gray-700 rounded-lg min-h-[100px]">
            {isLoading && !response && (
                 <p className="text-gray-400 animate-pulse">System is calculating the optimal response...</p>
            )}
            {response && (
                <div 
                    className="space-y-4"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(response) }} 
                />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemInterface;
