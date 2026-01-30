const blogPosts = [
   {
       id: 1,
       title: "Intentionality on content consumption",
       date: "2023-10-01",
       content: "Being intentional about the content you consume is the best thing you could do for your brain and peace. FOMO is the biggest hoax ever. ong",
   },
   {
       id: 2,
       title: "New Year's resolutions",
       date: "2023-10-05",
       content: "2026 is going to be the year we seek discomfort. Take the path of most resistance, fail miserably, cross off all the not fun tasks on our list, the year we show up regardless of how we feel, the year we seek Christ, the year we say no to conformity to the world.",
   },
   {
       id: 3,
       title: "Discipline and dependence",
       date: "2023-10-12",
       content: `Discipline without dependence leads to burnout. I'm all for spiritual discipline — getting in your daily prayer and quiet time
with the Scripture and all the nine yards. But if you do it all with sheer will
and discipline, one, it will lead to burnout; two, it will give you a sense of
pride that slowly makes you ignorant of the grace of God.

It becomes a race where, unknowingly, you are guided by your own understanding
and fail to surrender your weak, beaten body before Christ's throne.

And that burnout — well, the world and its arsenal of weapons are not something
to take lightly. Your discipline WILL fail you if it is not accompanied by
complete dependence on God's hand and grace.

That grace is what carries you when the storm comes — notice I didn't say *if*
the storm comes. As long as you're an earthling, there WILL be storms — many of
them.

So spiritual discipline, and bringing your flesh into subjection and submission
rather than being led by emotions or circumstances, must be accompanied by total
and complete dependence on His grace.`,
   },
   {
       id: 4,
       title: "Announcing Bible App",
       date: "2023-10-15",
       content: "I've been working on a Bible app for PCs packed with many features. Has Amharic and English KJV Bible,(more will be added soon) with many commentaries for every book. Comes preloaded with 50 spiritual books, you can click through different ambiences with foley sound for an immersive reading experience, It has a git like streak keeping system. You can write notes and reflections for every chapter and it will be shown everytime you open that chapter(you can opt to hide it). Hebrew support and audiobooks will rollout soon. It will also allow you to host and join Bible study groups right in the app. The software is still under development, its open source so feel free to check it out and contribute git repo (https://github.com/Bonsa-Dereje/Amharic-Bible-PC ) This project was started with a suggestion from one of @Remnant_s creators.",
   },
   {
       id: 5,
       title: "Alting scraper",
       date: "2023-10-20",
       content: "I built a redundant search automator and started a full run about 5 hours ago and its not even like quarter of halfway done. This might take days. The good part is that imma have to deal with the 24,000 images its gonna spit out after this run. yay ",
   },
   {
       id: 6,
       title: "Peace in God",
       date: "2023-10-25",
       content: "Without God as the ultimate answer, trying to make sense of the world and all of its shenanigans just makes it not make sense even more. Its a world where impending doom rules over and hope is no more. But, when we dwell in God and his scripture, we get this super sparkly hope and a genuine peace, a peace that can't really be given a reason to why it exists other than just —GOD. We sigh a sigh of pure relief knowing that we're on his hands and,now, doom is no more. ",
   }
];

let favorites = JSON.parse(localStorage.getItem('bonisFavorites')) || [];
let subscribers = JSON.parse(localStorage.getItem('bonisSubscribers')) || [];

const blogGrid = document.querySelector('.blog-grid');

function truncateText(text, sentenceCount = 2) {
   const sentences = text.match(/[^.!?]+[.!?]+/g);
   if (!sentences) return text;
   return sentences.slice(0, sentenceCount).join(' ').trim() + '..';
}

function renderPosts(posts) {
   if (!blogGrid) return;

   blogGrid.innerHTML = '';

   if (posts.length === 0) {
       blogGrid.innerHTML = '<p>No posts found.</p>';
       return;
   }

   posts.forEach(post => {
       const isFav = favorites.includes(post.id);
       const card = document.createElement('article');
       card.className = 'blog-card';
       card.style.cursor = 'pointer';
       card.onclick = () => openModal(post);

       const truncatedContent = truncateText(post.content, 2);

       card.innerHTML = `
           <h3>${post.title}</h3>
           <span class="date">${post.date}</span>
           <p>${truncatedContent}</p>
           <button class="fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${post.id})">
               ${isFav ? '♥' : '♡'}
           </button>
       `;
       blogGrid.appendChild(card);
   });
}

function renderFavorites() {
   const favPosts = blogPosts.filter(p => favorites.includes(p.id));
   renderPosts(favPosts);
}

function toggleFavorite(id) {
   if (favorites.includes(id)) {
       favorites = favorites.filter(favId => favId !== id);
   } else {
       favorites.push(id);
   }

   localStorage.setItem('bonisFavorites', JSON.stringify(favorites));

   if (window.location.pathname.includes('favorites')) {
       renderFavorites();
   } else {
       renderPosts(blogPosts);
   }
}

function createModal() {
   if (document.querySelector('.modal-overlay')) return;

   const modalOverlay = document.createElement('div');
   modalOverlay.className = 'modal-overlay';
   modalOverlay.innerHTML = `
       <div class="modal-content">
           <button class="modal-close">&times;</button>
           <div class="modal-header">
               <h2></h2>
               <span class="modal-date"></span>
           </div>
           <div class="modal-body"></div>
           <div class="modal-actions">
               <button class="action-btn favorite-btn"><i>♡</i> Favorite</button>
               <button class="action-btn copy-btn">Copy Text</button>
               <button class="action-btn share-btn">Share</button>
           </div>

           <!-- Comment Section -->
           <div class="comment-section">
               <h3>Comments</h3>
               <div class="comments-list"></div>
               <textarea placeholder="Write a comment..." class="comment-input"></textarea>
               <button class="comment-submit">Post Comment</button>
           </div>

           <a href="https://t.me/bonis_logs " target="_blank" class="redirect-btn">Read the original →</a>
       </div>
   `;

   document.body.appendChild(modalOverlay);

   const closeBtn = modalOverlay.querySelector('.modal-close');
   closeBtn.addEventListener('click', closeModal);
   modalOverlay.addEventListener('click', (e) => {
       if (e.target === modalOverlay) closeModal();
   });
}

function openModal(post) {
   createModal();

   const modal = document.querySelector('.modal-overlay');
   const title = modal.querySelector('.modal-header h2');
   const date = modal.querySelector('.modal-date');
   const body = modal.querySelector('.modal-body');
   const favBtn = modal.querySelector('.favorite-btn');
   const copyBtn = modal.querySelector('.copy-btn');
   const shareBtn = modal.querySelector('.share-btn');

   title.textContent = post.title;
   date.textContent = post.date;
   body.textContent = post.content;

   // Favorite toggle
   const updateFavBtn = () => {
       const isFav = favorites.includes(post.id);
       favBtn.classList.toggle('active', isFav);
       favBtn.innerHTML = isFav ? '<i>♥</i> Favorited' : '<i>♡</i> Favorite';
   };
   updateFavBtn();

   favBtn.onclick = () => {
       toggleFavorite(post.id);
       updateFavBtn();
   };

   // Copy text
   copyBtn.onclick = () => {
       navigator.clipboard.writeText(`${post.title}\n\n${post.content}`).then(() => {
           const originalText = copyBtn.textContent;
           copyBtn.textContent = 'Copied!';
           setTimeout(() => copyBtn.textContent = originalText, 2000);
       });
   };

   // Share
   shareBtn.onclick = () => {
       if (navigator.share) {
           navigator.share({ title: post.title, text: post.content, url: window.location.href }).catch(console.error);
       } else {
           navigator.clipboard.writeText(window.location.href).then(() => {
               const originalText = shareBtn.textContent;
               shareBtn.textContent = 'Link Copied!';
               setTimeout(() => shareBtn.textContent = originalText, 2000);
           });
       }
   };

   // -------------------
   // Comment Section
   const commentsList = modal.querySelector('.comments-list');
   const commentInput = modal.querySelector('.comment-input');
   const commentSubmit = modal.querySelector('.comment-submit');

   let postComments = JSON.parse(localStorage.getItem(`comments_post_${post.id}`)) || [];

   function renderComments() {
       commentsList.innerHTML = '';
       postComments.forEach(c => {
           const div = document.createElement('div');
           div.className = 'comment';
           div.textContent = c;
           commentsList.appendChild(div);
       });
       commentsList.scrollTop = commentsList.scrollHeight; // scroll to latest
   }

   renderComments();

   commentSubmit.onclick = () => {
       const text = commentInput.value.trim();
       if (!text) return;
       postComments.push(text);
       localStorage.setItem(`comments_post_${post.id}`, JSON.stringify(postComments));
       commentInput.value = '';
       renderComments();
   };

   // Show modal
   modal.classList.add('active');
   document.body.style.overflow = 'hidden';
}

function closeModal() {
   const modal = document.querySelector('.modal-overlay');
   if (modal) {
       modal.classList.remove('active');
       document.body.style.overflow = '';
   }
}

document.addEventListener('DOMContentLoaded', () => {
   createModal();
   if (window.location.pathname.includes('favorites')) {
       renderFavorites();
   } else {
       renderPosts(blogPosts);
   }

   // Newsletter
   const newsletterForm = document.getElementById('newsletterForm');
   const newsletterEmail = document.getElementById('newsletterEmail');
   const errorMsg = document.getElementById('errorMsg');
   const successMsg = document.getElementById('successMsg');

   if (newsletterForm) {
       newsletterForm.addEventListener('submit', (e) => {
           e.preventDefault();
           const email = newsletterEmail.value.trim();
           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

           if (!emailRegex.test(email)) {
               errorMsg.style.display = 'block';
               successMsg.style.display = 'none';
               return;
           }

           errorMsg.style.display = 'none';

           if (!subscribers.includes(email)) {
               subscribers.push(email);
               localStorage.setItem('bonisSubscribers', JSON.stringify(subscribers));
           }

           alert('Thank you for subscribing!');
           successMsg.textContent = 'Successfully subscribed!';
           successMsg.style.display = 'block';
           newsletterForm.reset();

           setTimeout(() => {
               successMsg.style.display = 'none';
           }, 3000);
       });
   }
});
