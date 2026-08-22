/* =========================================
   POSTER MASTER
   APPLICATION JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const body = document.body;

const themeToggle =
    document.getElementById("themeToggle");

const languageBtn =
    document.getElementById("languageBtn");

const languageText =
    document.getElementById("languageText");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const mobileNav =
    document.getElementById("mobileNav");

const postForm =
    document.getElementById("postForm");

const posterImage =
    document.getElementById("posterImage");

const dropZone =
    document.getElementById("dropZone");

const previewImage =
    document.getElementById("previewImage");

const emptyPreview =
    document.getElementById("emptyPreview");

const postTitle =
    document.getElementById("postTitle");

const postCategory =
    document.getElementById("postCategory");

const postDescription =
    document.getElementById("postDescription");

const previewTitle =
    document.getElementById("previewTitle");

const previewCategory =
    document.getElementById("previewCategory");

const previewDescription =
    document.getElementById("previewDescription");

const postsGrid =
    document.getElementById("postsGrid");

const noPosts =
    document.getElementById("noPosts");

const totalPosts =
    document.getElementById("totalPosts");

const searchInput =
    document.getElementById("searchInput");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const year =
    document.getElementById("year");


/* =========================================
   APPLICATION STATE
========================================= */

let currentLanguage =
    localStorage.getItem("posterMasterLanguage")
    || "en";


let currentTheme =
    localStorage.getItem("posterMasterTheme")
    || "dark";


let posts =
    JSON.parse(
        localStorage.getItem("posterMasterPosts")
    ) || [];


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        applyTheme();

        applyLanguage();

        renderPosts();

        updatePreview();

        year.textContent =
            new Date().getFullYear();

    }
);


/* =========================================
   THEME
========================================= */

function applyTheme() {

    if (currentTheme === "light") {

        body.classList.add("light");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        body.classList.remove("light");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

}


themeToggle.addEventListener(
    "click",
    () => {

        currentTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        localStorage.setItem(
            "posterMasterTheme",
            currentTheme
        );

        applyTheme();

    }
);


/* =========================================
   LANGUAGE
========================================= */

function applyLanguage() {

    document
        .querySelectorAll("[data-en]")
        .forEach(element => {

            if (currentLanguage === "ta") {

                element.textContent =
                    element.dataset.ta;

            } else {

                element.textContent =
                    element.dataset.en;

            }

        });


    document
        .querySelectorAll("[data-placeholder-en]")
        .forEach(element => {

            if (currentLanguage === "ta") {

                element.placeholder =
                    element.dataset.placeholderTa;

            } else {

                element.placeholder =
                    element.dataset.placeholderEn;

            }

        });


    if (currentLanguage === "en") {

        languageText.textContent =
            "தமிழ்";

        document.documentElement.lang =
            "en";

        body.classList.remove("tamil");

    } else {

        languageText.textContent =
            "English";

        document.documentElement.lang =
            "ta";

        body.classList.add("tamil");

    }


    updatePreviewText();

}


languageBtn.addEventListener(
    "click",
    () => {

        currentLanguage =
            currentLanguage === "en"
                ? "ta"
                : "en";

        localStorage.setItem(
            "posterMasterLanguage",
            currentLanguage
        );

        applyLanguage();

        renderPosts();

    }
);


/* =========================================
   MOBILE MENU
========================================= */

mobileMenuBtn.addEventListener(
    "click",
    () => {

        mobileNav.classList.toggle("active");

        const icon =
            mobileMenuBtn.querySelector("i");

        if (
            mobileNav.classList.contains("active")
        ) {

            icon.className =
                "fa-solid fa-xmark";

        } else {

            icon.className =
                "fa-solid fa-bars";

        }

    }
);


document
    .querySelectorAll(".mobile-nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove(
                    "active"
                );

                mobileMenuBtn
                    .querySelector("i")
                    .className =
                    "fa-solid fa-bars";

            }
        );

    });


/* =========================================
   IMAGE UPLOAD
========================================= */

posterImage.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];

        if (file) {

            showImagePreview(file);

        }

    }
);


function showImagePreview(file) {

    if (!file.type.startsWith("image/")) {

        showToast(
            currentLanguage === "ta"
                ? "தயவுசெய்து படத்தைத் தேர்ந்தெடுக்கவும்."
                : "Please select an image."
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        event => {

            previewImage.src =
                event.target.result;

            previewImage.style.display =
                "block";

            emptyPreview.style.display =
                "none";

        };


    reader.readAsDataURL(file);

}


/* =========================================
   DRAG AND DROP
========================================= */

[
    "dragenter",
    "dragover"
].forEach(eventName => {

    dropZone.addEventListener(
        eventName,
        event => {

            event.preventDefault();

            dropZone.classList.add(
                "dragover"
            );

        }
    );

});


[
    "dragleave",
    "drop"
].forEach(eventName => {

    dropZone.addEventListener(
        eventName,
        event => {

            event.preventDefault();

            dropZone.classList.remove(
                "dragover"
            );

        }
    );

});


dropZone.addEventListener(
    "drop",
    event => {

        const file =
            event.dataTransfer.files[0];

        if (!file) return;

        posterImage.files =
            event.dataTransfer.files;

        showImagePreview(file);

    }
);


/* =========================================
   LIVE PREVIEW
========================================= */

postTitle.addEventListener(
    "input",
    updatePreview
);


postDescription.addEventListener(
    "input",
    updatePreview
);


postCategory.addEventListener(
    "change",
    updatePreview
);


function updatePreview() {

    previewTitle.textContent =
        postTitle.value.trim()
            || (
                currentLanguage === "ta"
                    ? "போஸ்டர் தலைப்பு"
                    : "Poster Title"
            );


    previewCategory.textContent =
        getCategoryText(
            postCategory.value
        );


    previewDescription.textContent =
        postDescription.value.trim()
            || (
                currentLanguage === "ta"
                    ? "உங்கள் போஸ்டர் விளக்கம் இங்கே தோன்றும்."
                    : "Your poster description will appear here."
            );

}


function updatePreviewText() {

    updatePreview();

}


/* =========================================
   CATEGORY TRANSLATION
========================================= */

function getCategoryText(category) {

    if (currentLanguage === "en") {

        return category;

    }


    const translations = {

        "General": "பொதுவானது",

        "Education": "கல்வி",

        "Technology": "தொழில்நுட்பம்",

        "Event": "நிகழ்வு",

        "Creative": "படைப்பு"

    };


    return translations[category]
        || category;

}


/* =========================================
   PUBLISH POST
========================================= */

postForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const file =
            posterImage.files[0];


        if (!file) {

            showToast(
                currentLanguage === "ta"
                    ? "முதலில் ஒரு போஸ்டரை பதிவேற்றவும்."
                    : "Please upload a poster first."
            );

            return;

        }


        const title =
            postTitle.value.trim();


        if (!title) {

            showToast(
                currentLanguage === "ta"
                    ? "தலைப்பை உள்ளிடவும்."
                    : "Please enter a title."
            );

            postTitle.focus();

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            event => {

                const newPost = {

                    id:
                        Date.now(),

                    title:
                        title,

                    category:
                        postCategory.value,

                    description:
                        postDescription.value.trim(),

                    image:
                        event.target.result,

                    date:
                        new Date().toISOString()

                };


                posts.unshift(newPost);


                savePosts();

                renderPosts();


                postForm.reset();


                previewImage.src = "";

                previewImage.style.display =
                    "none";

                emptyPreview.style.display =
                    "flex";


                updatePreview();


                showToast(
                    currentLanguage === "ta"
                        ? "பதிவு வெற்றிகரமாக வெளியிடப்பட்டது!"
                        : "Post published successfully!"
                );


                document
                    .getElementById("posts")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            };


        reader.readAsDataURL(file);

    }
);


/* =========================================
   SAVE POSTS
========================================= */

function savePosts() {

    localStorage.setItem(
        "posterMasterPosts",
        JSON.stringify(posts)
    );

}


/* =========================================
   RENDER POSTS
========================================= */

function renderPosts() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    const filteredPosts =
        posts.filter(post => {

            return (

                post.title
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                post.description
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                post.category
                    .toLowerCase()
                    .includes(searchTerm)

            );

        });


    postsGrid.innerHTML = "";


    totalPosts.textContent =
        posts.length;


    if (filteredPosts.length === 0) {

        noPosts.style.display =
            "block";

        return;

    }


    noPosts.style.display =
        "none";


    filteredPosts.forEach(post => {

        const card =
            createPostCard(post);

        postsGrid.appendChild(card);

    });

}


/* =========================================
   CREATE POST CARD
========================================= */

function createPostCard(post) {

    const card =
        document.createElement("article");


    card.className =
        "post-card";


    const image =
        document.createElement("img");

    image.className =
        "post-image";

    image.src =
        post.image;

    image.alt =
        post.title;


    const content =
        document.createElement("div");

    content.className =
        "post-content";


    const category =
        document.createElement("span");

    category.className =
        "post-category";

    category.textContent =
        getCategoryText(post.category);


    const title =
        document.createElement("h3");

    title.textContent =
        post.title;


    const description =
        document.createElement("p");

    description.textContent =
        post.description
            || (
                currentLanguage === "ta"
                    ? "விளக்கம் இல்லை."
                    : "No description."
            );


    const footer =
        document.createElement("div");

    footer.className =
        "post-footer";


    const date =
        document.createElement("span");

    date.className =
        "post-date";

    date.textContent =
        formatDate(post.date);


    const deleteButton =
        document.createElement("button");

    deleteButton.className =
        "delete-btn";

    deleteButton.innerHTML =
        '<i class="fa-solid fa-trash"></i>';

    deleteButton.title =
        currentLanguage === "ta"
            ? "பதிவை நீக்கு"
            : "Delete Post";


    deleteButton.addEventListener(
        "click",
        () => {

            deletePost(post.id);

        }
    );


    footer.appendChild(date);

    footer.appendChild(deleteButton);


    content.appendChild(category);

    content.appendChild(title);

    content.appendChild(description);

    content.appendChild(footer);


    card.appendChild(image);

    card.appendChild(content);


    return card;

}


/* =========================================
   DELETE POST
========================================= */

function deletePost(id) {

    const confirmation =
        currentLanguage === "ta"
            ? "இந்த பதிவை நீக்க விரும்புகிறீர்களா?"
            : "Are you sure you want to delete this post?";


    if (!confirm(confirmation)) {

        return;

    }


    posts =
        posts.filter(
            post => post.id !== id
        );


    savePosts();

    renderPosts();


    showToast(
        currentLanguage === "ta"
            ? "பதிவு நீக்கப்பட்டது."
            : "Post deleted."
    );

}


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    renderPosts
);


/* =========================================
   DATE
========================================= */

function formatDate(dateString) {

    const date =
        new Date(dateString);


    if (currentLanguage === "ta") {

        return date.toLocaleDateString(
            "ta-LK",
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );

    }


    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}