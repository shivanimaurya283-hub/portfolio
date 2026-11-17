# Shivani Maurya – Portfolio Website

A simple, responsive personal portfolio built with only **HTML5, CSS3 and vanilla JavaScript**.
No frameworks and no build step, so it works directly on GitHub Pages.

## Folder structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── profile.jpg                   (your photo - included)
│   │   └── sign-language-project.jpg     (ADD your project picture here)
│   └── documents/
│       └── resume.pdf                    (your resume - included)
└── README.md
```

## Test on your computer

Double-click `index.html` to open it in your browser. No installation is needed.

## Publish on GitHub Pages

1. Sign in to GitHub and click **New repository**.
2. Name it `shivanimaurya283-hub.github.io` (this gives you the address `https://shivanimaurya283-hub.github.io`), or any name such as `portfolio` (address: `https://shivanimaurya283-hub.github.io/portfolio/`). Set it to **Public** and create it.
3. Click **Add file → Upload files**, then drag in everything **inside** the `portfolio` folder (`index.html`, `css`, `js`, `assets`, `README.md`). `index.html` must be at the top level of the repository.
4. Click **Commit changes**.
5. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select branch **main** and folder **/ (root)**, then click **Save**.
6. Wait 1–2 minutes and refresh the Pages screen. Your website link will appear at the top.

## How to update your content

Search for `EDIT:` in `index.html`. Each place where you may want to change something is marked with that comment.

| What you want to change | Where |
|---|---|
| Name, headline, introduction | Home section (`#home`) |
| About text and quick facts | About section (`#about`) |
| Education | Education section (copy one `<li class="timeline-item">` block to add more) |
| Skills | Skills section (each skill is one `<li>`) |
| Projects | Projects section (copy the commented template card) |
| Certificates | Certifications section (copy the commented template card) |
| Contact links | Contact section |
| Colours and fonts | The `:root` section at the top of `css/style.css` |

### Add your project picture
Save a picture of your project (for example a screenshot) as `assets/images/sign-language-project.jpg`. Until then, a coloured placeholder is shown.

### Add a project link
In the Projects section, find the commented "View Project" button, remove the comment markers and paste your GitHub or demo link.

### Update your photo or resume
Replace `assets/images/profile.jpg` or `assets/documents/resume.pdf` with a new file **using the same file name**.

### Show the Internship / Training section later
It is hidden because there is no internship yet. When you have one, uncomment the `#training` section and the "Training" menu link in `index.html`.

## Notes

- Keep file names and capital/small letters exactly the same, because GitHub Pages is case-sensitive.
- The site uses Google Fonts (Inter and Poppins). If they are blocked, it automatically uses your device's default fonts.
