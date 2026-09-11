/* ── Live date in masthead ── */
    const dateEl = document.getElementById('live-date');
    dateEl.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }).toUpperCase();

    /* ── Scroll-fade observer ── */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    /* ══════════════ CHATBOT ══════════════ */
    let chatOpen  = false;
    let chatInited = false;

    function toggleChat() {
        chatOpen = !chatOpen;
        const phone = document.getElementById('chat-phone');
        phone.classList.toggle('open', chatOpen);

        // Remove notification dot on first open
        const dot = document.getElementById('notif-dot');
        if (dot) dot.remove();

        if (chatOpen && !chatInited) {
            chatInited = true;
            initChat();
        }
    }

    function initChat() {
        showTyping(() => {
            addBot("👋 Hello! I'm <strong>Varra's personal assistant</strong>. I'm here to tell you all about Varra Sreenivasulu — Data Science specialist!", []);
            setTimeout(() => {
                showTyping(() => {
                    addBot("What would you like to know?", ["🛠 Skills", "📂 Projects", "🎓 Education", "🏆 Certifications", "📬 Contact", "👤 About Varra"]);
                });
            }, 600);
        });
    }

    /* ── Add bot message with optional quick replies ── */
    function addBot(html, quickReplies = []) {
        const box = document.getElementById('chat-messages');

        const msg = document.createElement('div');
        msg.className = 'msg bot';
        msg.innerHTML = html;
        box.appendChild(msg);

        if (quickReplies.length) {
            const qr = document.createElement('div');
            qr.className = 'quick-replies';
            quickReplies.forEach(label => {
                const btn = document.createElement('button');
                btn.className = 'qr-btn';
                btn.textContent = label;
                btn.onclick = () => {
                    addUser(label);
                    respond(label);
                    qr.remove();
                };
                qr.appendChild(btn);
            });
            box.appendChild(qr);
        }

        scrollBottom();
    }

    /* ── Add user message ── */
    function addUser(text) {
        const box = document.getElementById('chat-messages');
        const msg = document.createElement('div');
        msg.className = 'msg user';
        msg.textContent = text;
        box.appendChild(msg);
        scrollBottom();
    }

    /* ── Show typing indicator, then run callback ── */
    function showTyping(cb, delay = 850) {
        const box = document.getElementById('chat-messages');
        const t = document.createElement('div');
        t.className = 'typing';
        t.id = 'typing-indicator';
        t.innerHTML = '<span></span><span></span><span></span>';
        box.appendChild(t);
        scrollBottom();
        setTimeout(() => {
            t.remove();
            cb();
        }, delay);
    }

    /* ── Send from input ── */
    function sendMsg() {
        const inp = document.getElementById('msg-input');
        const text = inp.value.trim();
        if (!text) return;
        inp.value = '';
        addUser(text);
        setTimeout(() => respond(text), 400);
    }

    /* ── Scroll to bottom ── */
    function scrollBottom() {
        const box = document.getElementById('chat-messages');
        box.scrollTop = box.scrollHeight;
    }

    /* ══════════════ RESPONSE ENGINE ══════════════ */
    function respond(msg) {
        const m = msg.toLowerCase();

        showTyping(() => {
            /* Skills */
                        /* CV / Resume */
            if (/(cv|resume|download|portfolio pdf)/i.test(m)) {
                addBot(`📄 <strong>Varra's Resume:</strong><br><br>
                    You can view or download my complete Data Science CV below:<br><br>
                    <a href="Varra_Sreenivasulu_CV.pdf" target="_blank" style="display:inline-block; margin-top:8px; padding:6px 12px; background:var(--ink); color:var(--paper); text-decoration:none; font-weight:bold; border-radius:3px;">⬇️ Download CV</a>`,
                ["📄 Download CV", "🛠 Skills", "📂 Projects", "📬 Contact"]);
            }
            
            else if (/(skill|tech|language|stack|tool|python|library|libraries)/i.test(m)) {
                addBot(`🛠️ <strong>Varra's Technical Skills:</strong><br><br>
                    <strong>Languages:</strong> Python • C++ • C<br>
                    <strong>ML Libraries:</strong> NumPy • Pandas • Matplotlib • Seaborn • Scikit-learn<br>
                    <strong>BI & Analytics:</strong> Power BI • Power Query • DAX • Tableau<br>
                    <strong>Web & Backend:</strong> Flask • HTML • CSS • JavaScript<br>
                    <strong>Databases:</strong> MySQL • SQL • DBMS<br>
                    <strong>Dev Tools:</strong> Git • GitHub • VS Code • Railway<br>
                    <strong>Core CS:</strong> DSA · OOP's · Computer Networks`,
                ["📂 Projects", "📬 Contact"]);
            }

            /* Projects */
            else if (/(project|work|built|app|dashboard|house|flight|predict)/i.test(m)) {
                addBot(`📂 <strong>Featured Projects:</strong><br><br>
                    🏠 <strong>Indian House Price Prediction App</strong> (Apr–May 2026)<br>
                    End-to-end ML pipeline on 2.5 lakh listings · 4 models compared · Deployed live via Flask REST API on Railway<br><br>
                    ✈️ <strong>Flight Insights Dashboard</strong> (Mar–Apr 2026)<br>
                    Interactive Power BI dashboard · Airline KPIs · Power Query & DAX · actionable business insights<br><br>
                    Both are available on GitHub!`,
                ["🛠 Skills", "📬 Contact"]);
            }

            /* Education */
            else if (/(education|study|university|college|degree|school|lpu|cgpa|gpa)/i.test(m)) {
                addBot(`🎓 <strong>Education:</strong><br><br>
                    🏛️ <strong>B.Tech — CSE</strong><br>
                    Lovely Professional University, Punjab<br>
                    CGPA: <strong>7.42</strong> &nbsp;(2025 – 2028)<br><br>
                    🏫 <strong>Diploma in Engineering</strong><br>
                    Global College of Engg & Tech, Kadapa, AP<br>
                    77.2% &nbsp;(2022 – 2025)<br><br>
                    📚 <strong>Matriculation</strong><br>
                    Sri Chaitanya Techno School, Badvel, AP<br>
                    75.3% &nbsp;(2021 – 2022)`);
            }

            /* Certifications */
            else if (/(cert|credential|kaggle|ibm|nasscom|anthropic|infosys|wingspan)/i.test(m)) {
                addBot(`🏆 <strong>6 Industry Certifications:</strong><br><br>
                    📜 Python — <strong>Kaggle</strong> (Sep 2026)<br>
                    📜 Data Science Landscape — <strong>IBM SkillsBuild</strong> (Sep 2026)<br>
                    📜 Introduction to Data Science — <strong>Infosys</strong> (Sep 2026)<br>
                    📜 DBMS Part 1 — <strong>Wingspan</strong> (Aug 2026)<br>
                    📜 GEN AI Program — <strong>NASSCOM</strong> (Mar 2026)<br>
                    📜 Claude AI 101 — <strong>Anthropic</strong> (Mar 2026)`);
            }

            /* Training */
            else if (/(train|lpu training|agri|crop|analytics training)/i.test(m)) {
                addBot(`📚 <strong>LPU Data Analytics Training</strong> (Jun–Jul 2026)<br><br>
                    Covered: Excel · SQL · Python · Power BI · Tableau · AI tools<br><br>
                    🌾 Built <strong>AgriInsight Pro</strong> — a Crop Yield Intelligence Dashboard with <strong>16,000+ records</strong> across 13 states, 14 crop categories, 18 years of data, using Power Query, DAX & star-schema modelling.`);
            }

            /* Contact */
            else if (/(contact|email|phone|mobile|reach|hire|available|linkedin|github)/i.test(m)) {
                addBot(`📬 <strong>Get in Touch:</strong><br><br>
                    📧 <a href="mailto:info.varrasreenivasulu@gmail.com" style="color:var(--gold);">info.varrasreenivasulu@gmail.com</a><br>
                    📱 <a href="tel:+917675042646" style="color:var(--gold);">+91-7675042646</a><br>
                    💼 <a href="https://linkedin.com/in/varra-sreenivasulu" target="_blank" style="color:var(--gold);">linkedin.com/in/varra-sreenivasulu</a><br>
                    🐙 <a href="https://github.com/VarraSreenivasulu" target="_blank" style="color:var(--gold);">github.com/VarraSreenivasulu</a><br><br>
                    Varra is <strong>actively seeking Data Science opportunities</strong>! 🚀`);
            }

            /* About */
            else if (/(about|who|tell me|intro|varra|sreeni)/i.test(m)) {
                addBot(`👨‍💻 <strong>About Varra Sreenivasulu:</strong><br><br>
                    A passionate <strong>Data Science specialist</strong> from Andhra Pradesh, India, currently pursuing B.Tech CSE at Lovely Professional University.<br><br>
                    He transforms raw data into actionable insights using Python, ML, Power BI, and Flask. He has built <strong>real-world deployed ML apps</strong> and enterprise BI dashboards, holds <strong>6 industry certifications</strong>, and is actively looking for Data Science roles! 🚀`,
                ["🛠 Skills", "📂 Projects", "📬 Contact"]);
            }

            /* Greeting */
            else if (/(hi|hello|hey|howdy|sup|good)/i.test(m)) {
                addBot(`👋 <strong>Hello!</strong> Great to meet you! I'm Varra's portfolio assistant. What would you like to know?`,
                ["🛠 Skills", "📂 Projects", "🎓 Education", "📬 Contact"]);
            }

            /* Fallback */
            else {
                addBot(`🤔 I'm not sure about that, but I can tell you about:<br><br>
                    • 🛠 <strong>Skills</strong> & technologies<br>
                    • 📂 <strong>Projects</strong> he built<br>
                    • 🎓 <strong>Education</strong> background<br>
                    • 🏆 <strong>Certifications</strong><br>
                    • 📚 <strong>Training</strong> programmes<br>
                    • 📬 <strong>Contact</strong> info`,
                ["🛠 Skills", "📂 Projects", "📬 Contact"]);
            }
        });
    }

/* ===================== SCROLL REVEAL ENGINE ===================== */
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll('.hero-col, .article, .project-card, .timeline-item');
    
    // Add reveal class to targets
    reveals.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
});

/* ===================== NIGHT EDITION TOGGLE ===================== */
document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                themeBtn.textContent = '?? Morning Edition';
            } else {
                themeBtn.textContent = '?? Night Edition';
            }
        });
    }
});
