/* =====================================================
   POSTER MASTER
   COMPLETE APPLICATION JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const body =
    document.body;


const themeButton =
    document.getElementById("themeButton");


const languageButton =
    document.getElementById("languageButton");


const languageText =
    document.getElementById("languageText");


const mobileMenuButton =
    document.getElementById("mobileMenuButton");


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


const currentYear =
    document.getElementById("currentYear");



/* =====================================================
   STATE
===================================================== */

let currentLanguage =
    localStorage.getItem(
        "posterMasterLanguage"
    ) || "en";


let currentTheme =
    localStorage.getItem(
        "posterMasterTheme"
    ) || "dark";


let posts =
    JSON.parse(
        localStorage.getItem(
            "posterMasterPosts"
        )
    ) || [];


/* =====================================================
   OFFICIAL POSTER MASTER POST
===================================================== */

const officialPoster = {

    id:
        "poster-master-official",

    title:
        "Poster Master",

    category:
        "Creative",

    description:
        "Welcome to Poster Master! Upload, create and inspire with amazing posters.",

    image:
        "assets/poster-master-logo.png",

    date:
        "2026-08-22T00:00:00.000Z",

    official:
        true

};


/* =====================================================
   INSERT OFFICIAL POST
===================================================== */

function initializeOfficialPost() {

    const existingOfficialPost =
        posts.find(
            post =>
                post.id ===
                "poster-master-official"
        );


    /*
       If it doesn't exist,
       add it as the FIRST post.
    */

    if (!existingOfficialPost) {

        posts.unshift(
            officialPoster
        );

    }


    /*
       If it already exists,
       always move it to the first position.
    */

    else {

        posts =
            posts.filter(
                post =>
                    post.id !==
                    "poster-master-official"
            );

        posts.unshift(
            existingOfficialPost
        );

    }


    savePosts();

}


/* =====================================================
   SAVE POSTS
===================================================== */

function savePosts() {

    localStorage.setItem(
        "posterMasterPosts",
        JSON.stringify(posts)
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeOfficialPost();

        applyTheme();

        applyLanguage();

        renderPosts();

        updatePreview();

        currentYear.textContent =
            new Date().getFullYear();

    }
);


/* =====================================================
   THEME
===================================================== */

function applyTheme() {

    if (
        currentTheme ===
        "light"
    ) {

        body.classList.add(
            "light"
        );


        themeButton.innerHTML =
            '<i class="fa-solid fa-sun"></i>';


        themeButton.title =
            "Switch to dark mode";

    }

    else {

        body.classList.remove(
            "light"
        );


        themeButton.innerHTML =
            '<i class="fa-solid fa-moon"></i>';


        themeButton.title =
            "Switch to light mode";

    }

}


/* =====================================================
   THEME BUTTON
===================================================== */

themeButton.addEventListener(
    "click",
    () => {

        currentTheme =
            currentTheme ===
            "dark"
                ? "light"
                : "dark";


        localStorage.setItem(
            "posterMasterTheme",
            currentTheme
        );


        applyTheme();

    }
);


/* =====================================================
   LANGUAGE
===================================================== */

function applyLanguage() {


    /*
       Change normal text
    */

    document
        .querySelectorAll(
            "[data-en]"
        )
        .forEach(
            element => {

                if (
                    currentLanguage ===
                    "ta"
                ) {

                    element.textContent =
                        element.dataset.ta;

                }

                else {

                    element.textContent =
                        element.dataset.en;

                }

            }
        );


    /*
       Change placeholders
    */

    document
        .querySelectorAll(
            "[data-placeholder-en]"
        )
        .forEach(
            element => {

                if (
                    currentLanguage ===
                    "ta"
                ) {

                    element.placeholder =
                        element.dataset
                            .placeholderTa;

                }

                else {

                    element.placeholder =
                        element.dataset
                            .placeholderEn;

                }

            }
        );


    /*
       Change select options
    */

    document
        .querySelectorAll(
            "option[data-en]"
        )
        .forEach(
            option => {

                option.textContent =
                    currentLanguage === "ta"
                        ? option.dataset.ta
                        : option.dataset.en;

            }
        );


    /*
       Language button
    */

    if (
        currentLanguage ===
        "en"
    ) {

        languageText.textContent =
            "தமிழ்";

        document.documentElement.lang =
            "en";

        body.classList.remove(
            "tamil"
        );

    }

    else {

        languageText.textContent =
            "English";

        document.documentElement.lang =
            "ta";

        body.classList.add(
            "tamil"
        );

    }


    updatePreview();

}


/* =====================================================
   LANGUAGE BUTTON
===================================================== */

languageButton.addEventListener(
    "click",
    () => {

        currentLanguage =
            currentLanguage ===
            "en"
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


/* =====================================================
   MOBILE MENU
===================================================== */

mobileMenuButton.addEventListener(
    "click",
    () => {

        mobileNav.classList.toggle(
            "active"
        );


        const icon =
            mobileMenuButton
                .querySelector("i");


        if (
            mobileNav.classList.contains(
                "active"
            )
        ) {

            icon.className =
                "fa-solid fa-xmark";

        }

        else {

            icon.className =
                "fa-solid fa-bars";

        }

    }
);


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

document
    .querySelectorAll(
        ".mobile-nav a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mobileNav.classList.remove(
                        "active"
                    );


                    mobileMenuButton
                        .querySelector("i")
                        .className =
                        "fa-solid fa-bars";

                }
            );

        }
    );


/* =====================================================
   IMAGE UPLOAD
===================================================== */

posterImage.addEventListener(
    "change",
    event => {

        const file =
            event.target.files[0];


        if (!file) {

            return;

        }


        showImagePreview(
            file
        );

    }
);


/* =====================================================
   SHOW IMAGE PREVIEW
===================================================== */

function showImagePreview(
    file
) {

    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        showToast(
            currentLanguage === "ta"
                ? "தயவுசெய்து ஒரு படத்தை தேர்ந்தெடுக்கவும்."
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


    reader.readAsDataURL(
        file
    );

}


/* =====================================================
   DRAG AND DROP
===================================================== */

[
    "dragenter",
    "dragover"
].forEach(
    eventName => {

        dropZone.addEventListener(
            eventName,
            event => {

                event.preventDefault();

                event.stopPropagation();

                dropZone.classList.add(
                    "dragover"
                );

            }
        );

    }
);


[
    "dragleave",
    "drop"
].forEach(
    eventName => {

        dropZone.addEventListener(
            eventName,
            event => {

                event.preventDefault();

                event.stopPropagation();

                dropZone.classList.remove(
                    "dragover"
                );

            }
        );

    }
);


dropZone.addEventListener(
    "drop",
    event => {

        const file =
            event.dataTransfer.files[0];


        if (!file) {

            return;

        }


        showImagePreview(
            file
        );


        /*
           Browser security prevents us
           from manually assigning some
           FileList objects.

           We only need the preview here.
           The actual file will be selected
           normally when publishing.
        */

    }
);


/* =====================================================
   LIVE PREVIEW
===================================================== */

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


/* =====================================================
   UPDATE PREVIEW
===================================================== */

function updatePreview() {

    const title =
        postTitle.value.trim();


    const description =
        postDescription.value.trim();


    previewTitle.textContent =
        title ||
        (
            currentLanguage === "ta"
                ? "போஸ்டர் தலைப்பு"
                : "Poster Title"
        );


    previewCategory.textContent =
        getCategoryText(
            postCategory.value
        );


    previewDescription.textContent =
        description ||
        (
            currentLanguage === "ta"
                ? "உங்கள் போஸ்டர் விளக்கம் இங்கே தோன்றும்."
                : "Your poster description will appear here."
        );

}


/* =====================================================
   CATEGORY TRANSLATION
===================================================== */

function getCategoryText(
    category
) {

    if (
        currentLanguage ===
        "en"
    ) {

        return category;

    }


    const translations = {

        General:
            "பொதுவானது",

        Education:
            "கல்வி",

        Technology:
            "தொழில்நுட்பம்",

        Event:
            "நிகழ்வு",

        Creative:
            "படைப்பு"

    };


    return (
        translations[category] ||
        category
    );

}


/* =====================================================
   PUBLISH POST
===================================================== */

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
                    ? "பதிவு தலைப்பை உள்ளிடவும்."
                    : "Please enter a post title."
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
                        "post-" +
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
                        new Date().toISOString(),

                    official:
                        false

                };


                /*
                   Add new posts AFTER
                   the official logo post.
                */

                posts.push(
                    newPost
                );


                savePosts();

                renderPosts();


                /*
                   Reset form
                */

                postForm.reset();


                /*
                   Reset preview
                */

                previewImage.src =
                    "";


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


                /*
                   Scroll to gallery
                */

                document
                    .getElementById(
                        "posts"
                    )
                    .scrollIntoView({
                        behavior:
                            "smooth"
                    });

            };


        reader.readAsDataURL(
            file
        );

    }
);


/* =====================================================
   RENDER POSTS
===================================================== */

function renderPosts() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    let filteredPosts =
        posts.filter(
            post => {

                return (

                    post.title
                        .toLowerCase()
                        .includes(
                            searchTerm
                        )

                    ||

                    post.description
                        .toLowerCase()
                        .includes(
                            searchTerm
                        )

                    ||

                    post.category
                        .toLowerCase()
                        .includes(
                            searchTerm
                        )

                );

            }
        );


    /*
       Always keep official post first
    */

    filteredPosts.sort(
        (a, b) => {

            if (
                a.id ===
                "poster-master-official"
            ) {

                return -1;

            }


            if (
                b.id ===
                "poster-master-official"
            ) {

                return 1;

            }


            return new Date(b.date)
                - new Date(a.date);

        }
    );


    postsGrid.innerHTML =
        "";


    totalPosts.textContent =
        posts.length;


    if (
        filteredPosts.length ===
        0
    ) {

        noPosts.style.display =
            "block";

        return;

    }


    noPosts.style.display =
        "none";


    filteredPosts.forEach(
        post => {

            const card =
                createPostCard(
                    post
                );


            postsGrid.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   CREATE POST CARD
===================================================== */

function createPostCard(
    post
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "post-card";


    /*
       Official logo post
    */

    if (
        post.id ===
        "poster-master-official"
    ) {

        card.classList.add(
            "official-post"
        );

    }


    /* IMAGE */

    const image =
        document.createElement(
            "img"
        );


    image.className =
        "post-image";


    image.src =
        post.image;


    image.alt =
        post.title;



    /*
       Official badge
    */

    if (
        post.id ===
        "poster-master-official"
    ) {

        const ribbon =
            document.createElement(
                "div"
            );


        ribbon.className =
            "official-ribbon";


        ribbon.innerHTML =
            `
            <i class="fa-solid fa-circle-check"></i>
            <span>
                ${
                    currentLanguage === "ta"
                        ? "அதிகாரப்பூர்வம்"
                        : "OFFICIAL"
                }
            </span>
            `;


        card.appendChild(
            ribbon
        );

    }



    /* CONTENT */

    const content =
        document.createElement(
            "div"
        );


    content.className =
        "post-content";



    /* CATEGORY */

    const category =
        document.createElement(
            "span"
        );


    category.className =
        "post-category";


    category.textContent =
        getCategoryText(
            post.category
        );



    /* TITLE */

    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        post.title;



    /* DESCRIPTION */

    const description =
        document.createElement(
            "p"
        );


    description.textContent =
        post.description ||
        (
            currentLanguage === "ta"
                ? "விளக்கம் இல்லை."
                : "No description."
        );



    /* FOOTER */

    const footer =
        document.createElement(
            "div"
        );


    footer.className =
        "post-footer";



    /* DATE */

    const date =
        document.createElement(
            "span"
        );


    date.className =
        "post-date";


    date.textContent =
        formatDate(
            post.date
        );



    /*
       Delete button
       is hidden for official post
    */

    if (
        post.id !==
        "poster-master-official"
    ) {

        const deleteButton =
            document.createElement(
                "button"
            );


        deleteButton.type =
            "button";


        deleteButton.className =
            "delete-button";


        deleteButton.innerHTML =
            '<i class="fa-solid fa-trash"></i>';


        deleteButton.title =
            currentLanguage === "ta"
                ? "பதிவை நீக்கு"
                : "Delete Post";


        deleteButton.addEventListener(
            "click",
            () => {

                deletePost(
                    post.id
                );

            }
        );


        footer.appendChild(
            date
        );


        footer.appendChild(
            deleteButton
        );

    }

    else {

        footer.appendChild(
            date
        );

    }



    content.appendChild(
        category
    );


    content.appendChild(
        title
    );


    content.appendChild(
        description
    );


    content.appendChild(
        footer
    );


    card.appendChild(
        image
    );


    card.appendChild(
        content
    );


    return card;

}


/* =====================================================
   DELETE POST
===================================================== */

function deletePost(
    id
) {

    const confirmation =
        currentLanguage === "ta"
            ? "இந்த பதிவை நீக்க விரும்புகிறீர்களா?"
            : "Are you sure you want to delete this post?";


    if (
        !confirm(
            confirmation
        )
    ) {

        return;

    }


    /*
       Never allow official
       logo post to be deleted.
    */

    if (
        id ===
        "poster-master-official"
    ) {

        return;

    }


    posts =
        posts.filter(
            post =>
                post.id !== id
        );


    savePosts();

    renderPosts();


    showToast(
        currentLanguage === "ta"
            ? "பதிவு நீக்கப்பட்டது."
            : "Post deleted."
    );

}


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    () => {

        renderPosts();

    }
);


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(
    dateString
) {

    const date =
        new Date(
            dateString
        );


    if (
        currentLanguage ===
        "ta"
    ) {

        return date.toLocaleDateString(
            "ta-LK",
            {
                year:
                    "numeric",

                month:
                    "short",

                day:
                    "numeric"
            }
        );

    }


    return date.toLocaleDateString(
        "en-US",
        {
            year:
                "numeric",

            month:
                "short",

            day:
                "numeric"
        }
    );

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(
    message
) {

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


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