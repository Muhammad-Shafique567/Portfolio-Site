class Terminal {
    constructor() {
        this.output = document.getElementById('output');
        this.input = document.getElementById('commandInput');
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.commands = {
            help: this.help.bind(this),
            about: this.about.bind(this),
            skills: this.skills.bind(this),
            projects: this.projects.bind(this),
            experience: this.experience.bind(this),
            contact: this.contact.bind(this),
            clear: this.clear.bind(this)
        };
        
        this.init();
    }
    
    init() {
        this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.showWelcome();
    }
    
    showWelcome() {
        const welcomeText = `

<span class="ascii-art">
██╗  ██╗███████╗██╗     ██╗      ██████╗ 
██║  ██║██╔════╝██║     ██║     ██╔═══██╗
███████║█████╗  ██║     ██║     ██║   ██║
██╔══██║██╔══╝  ██║     ██║     ██║   ██║
██║  ██║███████╗███████╗███████╗╚ ██████╔╝
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝
</span>
<span class="success">Welcome to Muhammad-Ali Shafique's portfolio!</span>
<span class="info">System initialized successfully...</span>
<span class="highlight">Type 'help' to see available commands</span>
        `;
        this.addOutput(welcomeText);
    }
    
    handleKeyDown(e) {
        if(e.key === 'Enter') {
            const command = this.input.value.trim();
            if(command) { 
                this.executeCommand(command); 
                this.addToHistory(command);
            }
            this.input.value = '';
        } else if(e.key === 'ArrowUp') {
            e.preventDefault(); 
            this.navigateHistory(-1);
        } else if(e.key === 'ArrowDown') {
            e.preventDefault(); 
            this.navigateHistory(1);
        }
    }
    
    executeCommand(input) {
        const [command, ...args] = input.split(' ');
        this.addOutput(`<span class="prompt-symbol">$</span> <span class="command">${input}</span>`);
        if(this.commands[command]) { 
            this.commands[command](args); 
        } else { 
            this.addOutput(`<span class="error">Command not found: ${command}</span>`); 
        }
        window.scrollTo(0, document.body.scrollHeight);
    }
    
    addToHistory(command) { 
        this.commandHistory.push(command); 
        this.historyIndex = this.commandHistory.length; 
    }
    
    navigateHistory(direction) { 
        if(this.commandHistory.length === 0) return; 
        this.historyIndex += direction; 
        if(this.historyIndex < 0) this.historyIndex = 0; 
        else if(this.historyIndex >= this.commandHistory.length) { 
            this.historyIndex = this.commandHistory.length; 
            this.input.value = ''; 
            return; 
        } 
        this.input.value = this.commandHistory[this.historyIndex]; 
    }
    
    addOutput(text) {
        const div = document.createElement('div');
        div.className = 'output';
        div.innerHTML = text;
        this.output.appendChild(div);
    }

    help() {
        this.addOutput(`
<span class="success">Available Commands:</span>
about       - Display info about Muhammad-Ali
skills      - Show technical skills
projects    - List projects
experience  - Display work experience
contact     - Show contact info
clear       - Clear terminal

<span class="info">Use ↑/↓ keys to navigate command history</span>

        `);
    }

    about() {
        this.addOutput(`
<span class="success">About Me</span>
• Name: Muhammad-Ali Shafique
• Role: Full Stack Developer & Computer Science Student
• Location: Calgary, Alberta, Canada
• Education: B.Sc. Computer Science, University of Calgary
• Experience: VP of Technology at Competitive Programming Club
• Bio: Passionate developer focusing on web development, software engineering, and AI integration. 
        `);
    }

    skills() {
        this.addOutput(`
<span class="success">Technical Skills</span>
• Languages: JavaScript, Python, HTML, CSS, SQL, Java, C, ARMv8 Assembly
• Developer Tools: Node.js, VS Code, PyCharm, IntelliJ IDEA, SceneBuilder, Git/GitHub
• Frameworks: MERN Stack, Bootstrap
• Databases: MongoDB, MySQL
• Areas of Interest: Web Development & Design, AI Integration
        `);
    }

    projects() {
    this.addOutput(`
<span class="success">Projects</span>
<span class="info">═══════════════════════════════════════════════════════════</span>

<span class="highlight">1. Online Multiplayer Game Suite</span>
• <span class="info">Technologies:</span> Java, JavaFX, Git/GitHub, Sockets
• <span class="info">Description:</span> Developed a comprehensive multiplayer game suite for a team of 25, featuring multiple interactive games. Implemented a client-server architecture ensuring real-time synchronization between clients.
• <span class="info">Features:</span> Real-time multiplayer gameplay with chat functionality; robust server-client communication; interactive and responsive UI; scoreboards and leaderboards; user authentication.
• <span class="info">Impact:</span> Facilitated collaborative gameplay for 25+ users, enhanced user experience with responsive interfaces, strengthened teamwork and project management skills.
• <span class="info">URL:</span> <a class="link" href="https://github.com/Muhammad-Shafique567/OMG-Game" target="_blank">https://github.com/Muhammad-Shafique567/OMG-Game</a>

<span class="highlight">2. Workout Assistant</span>
• <span class="info">Technologies:</span> MERN Stack (MongoDB, Express.js, React, Node.js), JWT Authentication
• <span class="info">Description:</span> Designed a full-stack web application to track personal workouts and progress. Backend exposes a RESTful API for creating, updating, and retrieving workout data.
• <span class="info">Features:</span> User authentication and secure sessions; CRUD operations for workouts; MongoDB data persistence;
• <span class="info">Impact:</span> Helped users track workouts efficiently, improved data visualization and engagement, gained hands-on experience in full-stack development and RESTful APIs.
• <span class="info">URL:</span> <a class="link" href="https://github.com/Muhammad-Shafique567/WorkoutApp" target="_blank">https://github.com/Muhammad-Shafique567/WorkoutApp</a>

<span class="highlight">3. Food Macro Tracker</span>
• <span class="info">Technologies:</span> Java, JavaFX
• <span class="info">Description:</span> Desktop app for logging meals and calculating macronutrients
• <span class="info">Impact:</span> Enhanced user dietary awareness, gained experience in JavaFX and desktop app development.
    `);
}

    experience() {
        this.addOutput(`
<span class="success">Experience</span>
VP of Technology @ Competitive Programming Club, University of Calgary
• <span class="info">Duties:</span> I regularly update and maintain the club's website, ensuring it remains current and user-friendly. I ensure regular blog posts are published to keep members informed about upcoming events and coding challenges. I also manage the hosting services to ensure the website is always accessible.

    contact() {
        this.addOutput(`
<span class="success">Contact Information</span>
• Email: shafiquemuhammadali@gmail.com
• LinkedIn:https://www.linkedin.com/in/muhammad-ali-shafique-06815032a/
        `);
    }

    clear() { this.output.innerHTML = ''; }
}

// Initialize terminal
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});

// Keep input focused
document.addEventListener('click', () => {
    document.getElementById('commandInput').focus();
});
