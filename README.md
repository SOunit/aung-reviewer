# Aung Reviewer

🚀 AI-powered code reviewer for your pull requests and projects.  
It reads your git diff and provides clear, structured feedback to improve your code quality!

---

## ✨ Setup & Usage

1. **Clone this repository**

```bash
git clone https://github.com/your-username/aung-reviewer.git
cd aung-reviewer
```

2. **Create a `.env` file and set your OpenAI API key**

```env
OPENAI_API_KEY=your-openai-api-key
```

3. **Install dependencies and link the CLI tool globally**

```bash
npm install
npm link
```

4. **Move to your target project directory**

```bash
cd /path/to/your-project
```

5. **Switch to your working branch**

```bash
git checkout your-working-branch
```

6. **Run Aung Reviewer**

```bash
aung-reviewer <base-branch>...<your-working-branch>
```

Example:

```bash
aung-reviewer main...feature/login-page
```

🎯 This will analyze the git diff and provide AI-powered feedback!

---

## 💸 Billing Information

- This tool uses the **OpenAI API**, which charges based on actual token usage (pay-as-you-go).
- Make sure your OpenAI account has a balance above \$1. (Minimum recharge is \$10.)

---

## 📄 License

MIT License

---

## 📣 Contributions

Contributions and feedback are welcome!
Feel free to open issues or submit pull requests to help improve Aung Reviewer together! ✨
