import React, { useState } from 'react';
import { GitBranch, X, Copy, Check, Terminal, Plus, Minus, RefreshCw, Trash2 } from 'lucide-react';

const gitCommands = {
  'Getting Started': [
    { name: 'Initialize repository', code: 'git init', desc: 'Create new git repository' },
    { name: 'Clone repository', code: 'git clone <url>', desc: 'Clone remote repository' },
    { name: 'Configure user', code: 'git config --global user.name "Your Name"', desc: 'Set username' },
    { name: 'Configure email', code: 'git config --global user.email "email@example.com"', desc: 'Set email' },
  ],
  'Basic Commands': [
    { name: 'Check status', code: 'git status', desc: 'Show working tree status' },
    { name: 'Add files', code: 'git add .', desc: 'Stage all changes' },
    { name: 'Add specific file', code: 'git add <filename>', desc: 'Stage specific file' },
    { name: 'Commit changes', code: 'git commit -m "message"', desc: 'Commit with message' },
    { name: 'Add & commit', code: 'git commit -am "message"', desc: 'Stage tracked & commit' },
    { name: 'View history', code: 'git log --oneline', desc: 'Show commit history' },
  ],
  'Branching': [
    { name: 'List branches', code: 'git branch', desc: 'List local branches' },
    { name: 'List all branches', code: 'git branch -a', desc: 'List all branches' },
    { name: 'Create branch', code: 'git branch <name>', desc: 'Create new branch' },
    { name: 'Switch branch', code: 'git checkout <branch>', desc: 'Switch to branch' },
    { name: 'Create & switch', code: 'git checkout -b <branch>', desc: 'Create and switch' },
    { name: 'Switch (new)', code: 'git switch <branch>', desc: 'Switch to branch (new)' },
    { name: 'Create & switch (new)', code: 'git switch -c <branch>', desc: 'Create and switch (new)' },
    { name: 'Delete branch', code: 'git branch -d <branch>', desc: 'Delete branch locally' },
    { name: 'Force delete', code: 'git branch -D <branch>', desc: 'Force delete branch' },
    { name: 'Rename branch', code: 'git branch -m <old> <new>', desc: 'Rename branch' },
  ],
  'Remote': [
    { name: 'List remotes', code: 'git remote -v', desc: 'Show remote repositories' },
    { name: 'Add remote', code: 'git remote add origin <url>', desc: 'Add remote repository' },
    { name: 'Fetch changes', code: 'git fetch', desc: 'Download objects' },
    { name: 'Pull changes', code: 'git pull', desc: 'Fetch and merge' },
    { name: 'Pull rebase', code: 'git pull --rebase', desc: 'Pull with rebase' },
    { name: 'Push changes', code: 'git push', desc: 'Upload to remote' },
    { name: 'Push to origin', code: 'git push -u origin <branch>', desc: 'Push and set upstream' },
    { name: 'Force push', code: 'git push -f', desc: 'Force push (dangerous!)' },
    { name: 'Set upstream', code: 'git push -u origin main', desc: 'Set upstream branch' },
  ],
  'Stashing': [
    { name: 'Stash changes', code: 'git stash', desc: 'Save working directory' },
    { name: 'Stash with message', code: 'git stash save "message"', desc: 'Stash with description' },
    { name: 'List stashes', code: 'git stash list', desc: 'Show all stashes' },
    { name: 'Apply stash', code: 'git stash apply', desc: 'Apply latest stash' },
    { name: 'Apply specific', code: 'git stash apply stash@{0}', desc: 'Apply specific stash' },
    { name: 'Pop stash', code: 'git stash pop', desc: 'Apply and remove stash' },
    { name: 'Drop stash', code: 'git stash drop', desc: 'Delete latest stash' },
    { name: 'Clear all stashes', code: 'git stash clear', desc: 'Delete all stashes' },
  ],
  'Merging & Rebasing': [
    { name: 'Merge branch', code: 'git merge <branch>', desc: 'Merge branch into current' },
    { name: 'Merge no-ff', code: 'git merge --no-ff <branch>', desc: 'Merge with commit' },
    { name: 'Abort merge', code: 'git merge --abort', desc: 'Cancel merge' },
    { name: 'Rebase', code: 'git rebase main', desc: 'Rebase onto main' },
    { name: 'Interactive rebase', code: 'git rebase -i HEAD~3', desc: 'Edit last 3 commits' },
    { name: 'Continue rebase', code: 'git rebase --continue', desc: 'Continue after fixing' },
    { name: 'Abort rebase', code: 'git rebase --abort', desc: 'Cancel rebase' },
  ],
  'Undoing': [
    { name: 'Discard changes', code: 'git checkout -- .', desc: 'Discard all changes' },
    { name: 'Unstage file', code: 'git reset HEAD <filename>', desc: 'Unstage file' },
    { name: 'Undo commit (soft)', code: 'git reset --soft HEAD~1', desc: 'Undo commit keep changes' },
    { name: 'Undo commit (hard)', code: 'git reset --hard HEAD~1', desc: 'Undo commit discard' },
    { name: 'Revert commit', code: 'git revert <commit>', desc: 'Create revert commit' },
    { name: 'Reset to remote', code: 'git reset --hard origin/main', desc: 'Reset to remote' },
  ],
  'Diff & Show': [
    { name: 'Show changes', code: 'git diff', desc: 'Show unstaged changes' },
    { name: 'Show staged', code: 'git diff --staged', desc: 'Show staged changes' },
    { name: 'Diff branches', code: 'git diff main..branch', desc: 'Compare branches' },
    { name: 'Show commit', code: 'git show <commit>', desc: 'Show commit details' },
    { name: 'Show file commit', code: 'git log -p <filename>', desc: 'Show file history' },
    { name: 'Blame file', code: 'git blame <filename>', desc: 'Show file authors' },
  ],
  'Tags': [
    { name: 'List tags', code: 'git tag', desc: 'List all tags' },
    { name: 'Create tag', code: 'git tag v1.0.0', desc: 'Create annotated tag' },
    { name: 'Create lightweight', code: 'git tag v1.0.0 -a -m "message"', desc: 'Create tag with message' },
    { name: 'Push tags', code: 'git push --tags', desc: 'Upload all tags' },
    { name: 'Delete local', code: 'git tag -d v1.0.0', desc: 'Delete local tag' },
    { name: 'Delete remote', code: 'git push origin --delete v1.0.0', desc: 'Delete remote tag' },
  ],
  'Advanced': [
    { name: 'Clean untracked', code: 'git clean -fd', desc: 'Remove untracked files' },
    { name: 'Find bad commit', code: 'git bisect start', desc: 'Start bisect' },
    { name: 'Submodule add', code: 'git submodule add <url>', desc: 'Add submodule' },
    { name: 'Submodule update', code: 'git submodule update --init', desc: 'Update submodules' },
    { name: 'Worktree add', code: 'git worktree add <path> <branch>', desc: 'Add worktree' },
    { name: 'Cherry pick', code: 'git cherry-pick <commit>', desc: 'Pick commit' },
  ],
};

export default function GitCommands({ onClose }) {
  const [category, setCategory] = useState('Getting Started');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState('');

  const categories = Object.keys(gitCommands);
  const filteredCommands = search
    ? Object.entries(gitCommands).flatMap(([cat, cmds]) => 
        cmds.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search))
          .map(c => ({ ...c, category: cat }))
      )
    : gitCommands[category].map(c => ({ ...c, category }));

  const copyCode = (name: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(name);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-orange-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-orange-500/20">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-orange-500" />
          <span className="text-white font-semibold">Git Commands</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      
      {/* Search */}
      <div className="p-3 border-b border-gray-800">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search commands..."
          className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 text-sm"
        />
      </div>
      
      {/* Categories */}
      {!search && (
        <div className="flex border-b border-gray-800 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 text-xs whitespace-nowrap ${
                category === cat 
                  ? 'bg-gray-800 text-white border-b-2 border-orange-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      
      {/* Commands List */}
      <div className="flex-1 overflow-auto p-3 space-y-1">
        {filteredCommands.map((cmd, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-between bg-gray-800/50 px-3 py-2 rounded hover:bg-gray-800 group"
          >
            <div className="flex-1">
              <div className="text-white text-sm font-medium">{cmd.name}</div>
              <div className="text-gray-500 text-xs">{cmd.desc}</div>
              {search && <div className="text-orange-400 text-xs mt-1">{cmd.category}</div>}
            </div>
            <div className="flex items-center gap-2">
              <code className="text-xs text-green-400 bg-gray-900 px-2 py-1 rounded">{cmd.code}</code>
              <button 
                onClick={() => copyCode(cmd.name, cmd.code)}
                className="p-1 hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100"
              >
                {copied === cmd.name ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
