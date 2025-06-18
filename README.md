# Payload CMS Lexical Editor Custom Features

Full Stack Engineer technical challenge using Payload CMS, TypeScript, and Lexical Editor. Implements custom rich text features including &lt;mark> formatting and dynamic footnotes. Built with MongoDB, Lexical plugins, and Payload's blank starter.

## Author

**Whilce Dy**  
Date: June 18, 2025

---

## 📌 Overview

This project implements a custom [Payload CMS](https://payloadcms.com/) instance using [Lexical](https://lexical.dev/) as its rich text editor, and includes two advanced features:

- **Highlight (`<mark>`) feature**
- **Footnote feature with inline preview and drawer editing**

All features are written in **TypeScript** using **Payload v3.x.x** with a **MongoDB** database.

---

## 🛠 Features Implemented

### ✅ 1. Basic Payload CMS Setup

- Fresh Payload instance using the blank template.
- MongoDB integration via environment config.

### ✅ 2. Lexical Editor Integration

- Enabled Lexical as the default rich text editor in `payload.config.ts`.

### ✅ 3. Posts Collection

- `title`: Plain text field.
- `content`: Rich text field using Lexical.

### ✅ 4. `<mark>` Highlight Feature

- Custom toolbar button placed between `strikethrough` and `subscript`.
- Uses the `faHighlighter` FontAwesome icon.
- Toggle wraps/unwraps selected text with `<mark>`.
- Button reflects active/inactive state depending on selection.
- Selection is preserved on click.
- Serializes to proper `<mark>` in HTML output.

📽 **Loom demo:** [Watch Highlight Feature in Action](#) <!-- Replace with real link -->

### ✅ 5. Footnote Feature

- Replaces the default `superscript` button with a custom footnote handler.
- Footnotes incrementally numbered.
- Clicking inserts a `<sup>` node and opens a modal/drawer to input content.
- Footnote content supports:
  - Paragraphs
  - Bold, Italic, Strikethrough
  - Links
- Inline preview with **edit** and **delete** buttons.
- Converts to `<sup>` with anchor reference and `<footer><ul><li>` HTML on export.

📽 **Loom demo:** [Watch Footnote Feature in Action](#) <!-- Replace with real link -->

---

## 🚀 Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/Whilce-Dy883/payload-cms-lexical-features
cd payload-cms-lexical-features
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```
MONGODB_URI=mongodb://localhost:27017/your-db
PAYLOAD_SECRET=your-secret
```

### 4. Run the development server

```bash
npm run dev
```

---

## 🧪 Testing the Features

Once the server is running:

- Navigate to `http://localhost:3000/admin`
- Login with default Payload credentials or set up your own.
- Go to the **Posts** collection and try creating a new post.
- Use the Lexical editor to:
  - Highlight text with the new button.
  - Insert and edit footnotes.

---

## 🕒 Time Spent

> **Total Duration:** 6 hours

---

## 📤 Submission

- ✅ Code committed incrementally
- ✅ Public GitHub repository
- ✅ Loom videos added
- ✅ README included

---

## 📦 Tech Stack

- Payload CMS v3
- Lexical Editor
- MongoDB
- TypeScript
- FontAwesome

---
