

A simple interactive **blog interface** built with JavaScript, HTML, and CSS. This project allows users to **view blog posts**, **mark favorites**, and **read full content in a modal**. Favorites are saved in the browser using `localStorage`.

---

## **Features**

* **Blog Grid**: Displays all blog posts as cards with truncated previews.
* **Truncate Content**: Shows the first 2 sentences of each post in the preview.
* **Favorites**:

  * Mark/unmark posts as favorite.
  * Favorites are persisted in `localStorage`.
  * Favorite posts can be viewed on a dedicated "Favorites" page.
* **Modal Popup**:

  * Clicking a post opens a modal with full content.
  * Modal includes buttons for:

    * **Favorite / Unfavorite**
    * **Copy content**
    * **Share post** (via native share API or clipboard)
  * Modal can be closed by clicking outside or the close button.
* **Responsive & Interactive**: Uses pure JavaScript for dynamic DOM manipulation.

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/yourusername/bonsa-blog.git
cd bonsa-blog
```

2. Open `index.html` in a browser.

> No server or build tools are required. Works in modern browsers with JavaScript enabled.

---

## **Usage**

1. **View Blog Posts**

   * All posts are displayed in the `.blog-grid` container.
   * Each card shows the title, date, and a preview of the content.

2. **Open Full Post**

   * Click on a blog card to open the modal with full content.

3. **Favorites**

   * Click the heart icon (♡/♥) on a card or inside the modal to toggle favorite status.
   * Favorite posts are stored in `localStorage` and persist across page reloads.
   * Visit `favorites.html` (or `/favorites`) to see only favorited posts.

4. **Copy & Share**

   * **Copy**: Copies the post title and content to clipboard.
   * **Share**: Uses the native `navigator.share` API if available, or copies the URL to clipboard.

---

## **File Structure**

```
bonsa-blog/
│
├─ index.html          # Main blog page
├─ favorites.html      # Favorites page (optional)
├─ style.css           # CSS styling for blog and modal
├─ script.js           # JavaScript logic for posts, favorites, modal
└─ README.md           # Project documentation
```

---

## **Customization**

* **Blog Posts**:

  * Replace `blogPosts` array in `script.js` with your own posts:

```js
const blogPosts = [
  { id: 1, title: "My First Post", date: "2026-01-30", content: "This is the content of my first post..." },
  { id: 2, title: "Another Post", date: "2026-01-29", content: "Here is some more content..." }
];
```

* **Truncate Length**:

  * Change the number of sentences displayed in previews:

```js
truncateText(post.content, 3); // shows first 3 sentences
```

* **Styling**:

  * Modify `style.css` to change the layout, modal appearance, or favorite button styles.

---

## **Browser Compatibility**

* Modern browsers (Chrome, Firefox, Edge, Safari)
* Requires JavaScript and `localStorage` support
* `navigator.share` works only on supported devices (mobile browsers)

---

## **License**

This project is **MIT Licensed**. Feel free to use, modify, or distribute.

---

## **Credits**

* Created by **Bonsa Dereje**
* Inspired by interactive blog designs and minimal JavaScript solutions

---

If you want, I can also **add a small "How it works" flow diagram** inside the README that visually shows **Posts → Card → Modal → Favorites**, which looks very professional.

Do you want me to add that?
