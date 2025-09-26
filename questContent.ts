interface QuestContent {
  [questId: number]: {
    learn: string;
    practice?: {
      task: string;
      initialCode?: string;
      // This is a function as a string. It takes userCode and returns { correct: boolean, feedback: string }
      solutionChecker: string;
    };
  };
}

export const QUEST_CONTENT: QuestContent = {
  101: {
    learn: `
      <h2>The Monarch's Resolve: Journaling</h2>
      <p>Strength is not born from uninterrupted success, but from the relentless analysis of failure. The weak are crushed by their mistakes; the strong forge them into weapons. This is the purpose of the Growth Mindset Ritual.</p>
      
      <h3>1. Daily Journaling: Scribing Your Path</h3>
      <p>Each day, you must document your journey. Record the challenges you faced, the bugs you conquered, and the concepts that eluded you. This is not a diary of complaints; it is a ledger of your battles. It provides the raw data for your growth.</p>
      
      <h3>2. Reflection on Failure: Extracting the Shadow</h3>
      <p>Failure is the greatest of teachers. When you fail—and you will—do not discard the experience. Analyze it. Dissect it. Understand its root cause. Every failure contains a lesson, a "shadow" of knowledge that, once extracted, makes you stronger. Ask yourself:</p>
      <ul class="list-disc pl-6 space-y-2 text-gray-300">
        <li>What was the exact point of failure?</li>
        <li>What was my assumption that proved incorrect?</li>
        <li>What new knowledge have I gained from this?</li>
        <li>How will I approach a similar problem in the future?</li>
      </ul>
      <p>This ritual sharpens your mind and fortifies your will. It transforms setbacks into stepping stones on your path to becoming the Sovereign of Code. Do not neglect it.</p>
    `,
    practice: {
      task: "Reflect on a recent challenge, setback, or failure in your developer journey. It could be a bug that took hours to solve, a concept you struggled with, or a mistake you made. Document what you learned from it. Your reflection must be at least 50 characters.",
      initialCode: `Today's challenge was...\n\nThe point of failure occurred when...\n\nFrom this, I learned that...\n\nNext time, I will...`,
      solutionChecker: `(userCode) => {
          if (!userCode || userCode.trim().length < 50) {
              return { correct: false, feedback: 'Reflection is too brief. Deeper introspection is required for growth. Minimum 50 characters.' };
          }
          if (userCode.trim().length > 1000) {
              return { correct: false, feedback: 'Reflection is too long. Be concise and potent in your analysis.' };
          }
          return { correct: true, feedback: 'Reflection logged. The System has recorded your growth.' };
      }`
    }
  },
  102: {
    learn: `
      <h2>The Bedrock of Power: Core Syntax</h2>
      <p>Every legendary spell is built from basic runes. In coding, these runes are the fundamental syntax constructs. Master them, and you can build anything.</p>
      
      <h3>1. Variables: Containers of Mana</h3>
      <p>Variables are named containers that store data. Think of them as mana potions, each holding a different type of power (number, text, boolean, etc.). Use <code>let</code> for variables that can change and <code>const</code> for variables that should never change after being set.</p>
      <pre><code>let level = 1; // A number that can be changed
const playerName = "Sung Jin-Woo"; // A string (text) that is constant
let isAwakened = true; // A boolean (true or false)</code></pre>
      
      <h3>2. Conditionals: The Crossroads of Fate</h3>
      <p>Conditionals (like <code>if...else</code>) allow your code to make decisions, executing different paths based on whether a condition is true or false.</p>
      <pre><code>if (level >= 10) {
  console.log("A Job Change Quest has arrived!");
} else {
  console.log("You are not strong enough. Keep training.");
}</code></pre>

      <h3>3. Loops: The Endless Grind</h3>
      <p>Loops (like <code>for</code> or <code>while</code>) repeat a block of code multiple times. This is essential for training, processing lists of items, or any repetitive task.</p>
      <pre><code>// A loop to complete 5 daily push-ups
for (let i = 1; i <= 5; i++) {
  console.log("Push-up #" + i + " complete!");
}</code></pre>

      <hr class="border-gray-700 my-6">

      <h4>Knowledge in Action: A Practical Example</h4>
      <p class="text-gray-300"><strong>Question:</strong> A new monster, a 'Goblin', has appeared. It has 100 health points. You, the player 'Sung Jin-Woo', deal 25 damage to it. How would you represent this scenario using variables?</p>

      <h5 class="font-bold mt-4 text-purple-300">Solution:</h5>
      <pre><code>// 1. Represent the monster's initial health
let monsterHealth = 100;

// 2. Represent the player's name (which doesn't change)
const playerName = "Sung Jin-Woo";

// 3. Represent the damage dealt
let damageDealt = 25;

// 4. Calculate the new health
monsterHealth = monsterHealth - damageDealt; // monsterHealth is now 75

// 5. Announce the result
console.log(playerName + " dealt " + damageDealt + " damage. The Goblin has " + monsterHealth + " health remaining.");
</code></pre>

      <h5 class="font-bold mt-4 text-purple-300">Explanation:</h5>
      <ul class="list-disc pl-6 space-y-2 text-gray-300">
          <li>We use <code>let</code> for <code>monsterHealth</code> and <code>damageDealt</code> because these values can change during a fight. The monster's health will decrease, and the damage you deal might vary.</li>
          <li>We use <code>const</code> for <code>playerName</code> because your name is constant and should not be accidentally changed in the code.</li>
          <li>The final line demonstrates how these variables can be used together to describe the state of the battle. This is the core of programming: modeling real-world situations with data.</li>
      </ul>

      <hr class="border-gray-700 my-6">

      <p>Master these three pillars, and you will have the foundation required to rise through the ranks.</p>
    `,
    practice: {
      task: "Your first incantation. Declare a variable named `level` using `let` and assign it the number `1`. Then, declare a constant named `playerName` using `const` and assign it the string `\"Sung Jin-Woo\"`.",
      initialCode: `// Write your code here, Monarch.\n`,
      solutionChecker: `(userCode) => {
        try {
            // We append a return statement to the user's code to extract the variables for analysis.
            const executor = new Function(userCode + '; return { level, playerName };');
            const result = executor();
            
            if (result.level === undefined) {
                 return { correct: false, feedback: 'Analysis Failed: The variable "level" was not declared or returned.' };
            }
            if (typeof result.level !== 'number' || result.level !== 1) {
                 return { correct: false, feedback: 'Analysis Failed: The variable "level" must be the number 1.' };
            }
            if (result.playerName === undefined) {
                 return { correct: false, feedback: 'Analysis Failed: The constant "playerName" was not declared or returned.' };
            }
            if (typeof result.playerName !== 'string' || result.playerName !== 'Sung Jin-Woo') {
                 return { correct: false, feedback: 'Analysis Failed: The constant "playerName" must be the string "Sung Jin-Woo".' };
            }

            // Check if 'let' was used for level by trying to reassign it (this should pass)
            try {
                new Function(userCode + '; level = 2;')();
            } catch (e) {
                return { correct: false, feedback: 'Analysis Failed: The variable "level" must be declared with "let" so it can be changed.' };
            }

            // Check for const-ness by trying to catch a reassignment error
            try {
                new Function(userCode + '; playerName = "something else";')();
                // If it runs without error, it wasn't a const
                return { correct: false, feedback: 'Analysis Failed: "playerName" should be a constant (const) which cannot be changed.' };
            } catch (error) {
                // If it throws a "TypeError: Assignment to constant variable", it's correct.
                if (error instanceof TypeError) {
                     return { correct: true, feedback: 'Analysis Complete. Syntax is correct. Well done, Monarch.' };
                }
                // Some other error might have occurred
                throw error;
            }
        } catch (e) {
            return { correct: false, feedback: 'Syntax Error: ' + e.message };
        }
    }`
    }
  }
};