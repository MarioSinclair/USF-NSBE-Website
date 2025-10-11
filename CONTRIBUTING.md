## Contributing to the USF NSBE Website

### Description
This project is a simple, responsive website built with HTML, CSS and JavaScript. The website is majority complete, and additions need to be made for some of the pages following the existing template and styling language.

### Installation
To set up the project locally, follow these steps:

```sh
# Clone the repository
git clone https://github.com/MarioSinclair/USF-NSBE-Website.git

# Navigate to the project directory
cd USF-NSBE-Website
```

### Running the Project Locally

Choose any of the following options:

#### Option 1: VS Code Live Server (Recommended)
The easiest method if you use VS Code:
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click on `index.html` → "Open with Live Server"
3. Your site will automatically open at `http://127.0.0.1:5500/`
4. Changes auto-reload when you save files

#### Option 2: Python (Built into most systems)
If you have Python installed:
```sh

python -m http.server 8000

```
Then visit `http://localhost:8000` in your browser.

#### Option 3: Node.js
If you have Node.js/npm installed:
```sh
# Using npx (no installation needed)
npx serve

# Or install http-server globally
npm install -g http-server
http-server -p 8000
```

### Contribution Guidelines
1. **Fork the Repository** – Click the "Fork" button on the repository's GitHub page to create your own copy.
2. **Create a New Branch** – Before making changes, create a new branch for your feature or fix:
   ```sh
   git checkout -b your-feature-branch
   ```
3. **Make Your Changes** – Follow the existing styling and structure while adding new pages or modifying content.
4. **Commit Your Changes** – Write clear commit messages:
   ```sh
   git commit -m "Added new about page"
   ```
5. **Push to Your Fork** – Push the changes to your branch:
   ```sh
   git push origin your-feature-branch
   ```
6. **Submit a Pull Request** – Navigate to the original repository and create a pull request describing your changes.

### Code Style Guidelines
- Follow the existing HTML and CSS structure.
- Use consistent indentation and spacing.
- Ensure your changes are responsive and mobile-friendly.

### Issues & Support
If you encounter any issues, feel free to check the [Issues](https://github.com/MarioSinclair/NSBE-LandingPage/issues) section or open a new issue describing the problem.

Happy coding and thanks for contributing!
