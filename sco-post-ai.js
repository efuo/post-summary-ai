var ScoPostAi = {
    root: "https://summary.tianli0.top",
    scoGPTIsRunning: false,
    aiTalkMode: false,
    aiPostExplanation: "",
    config: {
        evid: "#article-container",
        aiTag: "ScoGPT",
        tip: "此内容根据文章生成，并经过人工审核，仅用于文章内容的解释与总结",
        report: ""
    },

    init(config) {
        if (config === null || document.querySelector(config.evid) === null) {
            return;
        }
        this.config = config;
        this.setHtml();
        this.setCss();
        this.generate();
        this.AIEngine();
        config.pjax && this.pjax();
    },

    pjax() {
        document.addEventListener('pjax:complete', () => {
            this.init(scoConfig);
        })
    },

    setHtml() {
        const articleContainer = document.querySelector(this.config.evid);
        const aiPostElement = document.createElement("div");
        aiPostElement.classList.add("post-ai");
        const aiTitleIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350" class="ai-title-icon" width="24" height="24"><path d="M235.9968,63.1381078 L253.5,63.1381078 C285.80838,63.1381078 312,89.3111777 312,121.596675 L312,199.541432 C312,231.82693 285.80838,258 253.5,258 L58.5,258 C26.19162,258 0,231.82693 0,199.541432 L0,121.596675 C0,89.3111777 26.19162,63.1381078 58.5,63.1381078 L76.0032,63.1381078 L68.87868,20.4236016 C67.28514,10.8699128 73.74432,1.83377709 83.30478,0.241365709 C92.86524,-1.35104567 101.90778,5.10355964 103.50132,14.6572485 L111.30132,61.4241026 C111.39726,61.997776 111.46356,62.5698905 111.50256,63.1381078 L200.49744,63.1381078 C200.53644,62.5691111 200.60274,61.997776 200.69868,61.4241026 L208.49868,14.6572485 C210.09222,5.10355964 219.13476,-1.35104567 228.69522,0.241365709 C238.25568,1.83377709 244.71486,10.8699128 243.12132,20.4236016 L235.9968,63.1381078 Z M58.5,98.2132484 C45.57618,98.2132484 35.1,108.682009 35.1,121.596675 L35.1,199.541432 C35.1,212.456099 45.57618,222.924859 58.5,222.924859 L253.5,222.924859 C266.42382,222.924859 276.9,212.456099 276.9,199.541432 L276.9,121.596675 C276.9,108.682009 266.42382,98.2132484 253.5,98.2132484 L58.5,98.2132484 Z M76.44,144.980103 C76.44,135.294687 84.29772,127.442532 93.99,127.442532 C103.68228,127.442532 111.54,135.294687 111.54,144.980103 L111.54,160.569054 C111.54,170.254469 103.68228,178.106624 93.99,178.106624 C84.29772,178.106624 76.44,170.254469 76.44,160.569054 L76.44,144.980103 Z M200.46,144.980103 C200.46,135.294687 208.31772,127.442532 218.01,127.442532 C227.70228,127.442532 235.56,135.294687 235.56,144.980103 L235.56,160.569054 C235.56,170.254469 227.70228,178.106624 218.01,178.106624 C208.31772,178.106624 200.46,170.254469 200.46,160.569054 L200.46,144.980103 Z" transform="translate(19 46)" fill="#000" fill-rule="nonzero"></path></svg>`;
        aiPostElement.innerHTML = `<div class="ai-title"><div class="ai-title-left">${aiTitleIconSvg}<div class="ai-title-text">文章摘要</div></div><div class="ai-tag" id="ai-tag">${this.config.aiTag}</div></div><div class="ai-explanation"></div><div class="ai-suggestions"></div><div class="ai-bottom"><div class="ai-tips">${this.config.tip}</div><a class="ai-report" href="${this.config.report}">投诉</a><div>`;
        articleContainer.insertBefore(aiPostElement, articleContainer.firstChild);
    },

    setCss() {
        var css = `.post-ai{background:var(--sco-secondbg);border-radius:12px;padding:12px;line-height:1.3;margin:16px 0;min-height:101.22px;border:1px solid var(--sco-border)}.post-ai .ai-title{display:flex;color:var(--sco-lighttext);border-radius:8px;align-items:center;padding:0 12px;user-select:none}.post-ai .ai-title .ai-title-left{display:flex;align-items:center;color:var(--sco-lighttext)}.post-ai .ai-title .ai-title-left svg.ai-title-icon{width:24px;height:24px;padding:4px;display:flex;background:var(--sco-lighttext);font-size:14px;border-radius:20px;justify-content:center;align-items:center}.post-ai .ai-title .ai-title-left svg.ai-title-icon path{fill:#fff}.post-ai .ai-title .ai-title-left .ai-title-text{font-weight:700;margin-left:8px;line-height:1;font-size:14px}.post-ai .ai-title .ai-tag{font-size:12px;background-color:var(--sco-lighttext);box-shadow:var(--sco-shadow-main);color:var(--sco-card-bg);font-weight:700;border-radius:12px;margin-left:auto;line-height:12px;padding:6px 8px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.3s}.post-ai .ai-title .ai-tag.loadingAI{animation-duration:2s;animation-name:AILoading;animation-iteration-count:infinite;animation-direction:alternate;cursor:default}.post-ai .ai-title .ai-tag:hover:not(.loadingAI){background:#000;color:#fff}.post-ai .ai-explanation{margin-top:12px;padding:8px 12px;background:var(--sco-card-bg);border-radius:8px;border:var(--style-border-always);font-size:15px;line-height:1.4;display:none;text-align:left}.post-ai .ai-explanation .blinking-cursor{background-color:var(--sco-lighttext);width:14px;height:14px;border-radius:16px;display:inline-block;vertical-align:middle;animation:blinking-cursor 2s infinite;-webkit-animation:blinking-cursor 2s infinite;margin-left:4px;margin-bottom:3px;transform:scale(.6)}.post-ai .ai-suggestions{display:flex;flex-wrap:wrap}.post-ai .ai-suggestions .ai-suggestions-item{margin-top:12px;padding:8px 12px;background:var(--sco-card-bg);border:1px solid var(--sco-border);border-radius:8px 8px 8px 0;font-size:14px;line-height:1.4;display:flex;width:fit-content;margin-right:12px;cursor:pointer;transition:.3s}.post-ai .ai-suggestions .ai-suggestions-item:hover{background:var(--sco-lighttext);color:#fff}.post-ai .ai-bottom{width:100%;margin-top:12px;padding:0 12px;display:flex}.post-ai .ai-bottom .ai-tips{font-size:12px;color:var(--sco-secondtext);margin-right:auto}.post-ai .ai-bottom .ai-report{font-size:12px;color:var(--sco-secondtext)!important;text-decoration:none;white-space:nowrap}.post-ai .ai-bottom .ai-report:hover{color:var(--sco-lighttext)!important;text-decoration:none!important}@media screen and (max-width:768px){.post-ai{margin-top:22px}}@media screen and (min-width:768px) and (max-width:1300px){#post>div.relatedPosts>div.relatedPosts-list>div:nth-child(7),#post>div.relatedPosts>div.relatedPosts-list>div:nth-child(8){display:none}}:root{--sco-secondtext:rgba(60,60,67,.8);--style-border-always:1px solid #e3e8f7;--sco-card-bg:#fff;--sco-lighttext:#425aef;--sco-secondbg:#f7f7f9;--sco-border:#e3e8f7}@keyframes blinking-cursor{0%,50%,100%{transform:scale(.6)}25%,75%{transform:scale(1)}}@keyframes AILoading{0%,50%,100%{opacity:1}25%,75%{opacity:.3}}`;
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    },

    getTitleAndContent() {
        const title = document.title;
        const articleContainer = document.querySelector(this.config.evid);
        const paragraphs = Array.from(articleContainer.getElementsByTagName("p"));
        const headings = Array.from(articleContainer.querySelectorAll("h1, h2, h3, h4, h5"));

        const content = [
            ...headings.map(heading => heading.innerText),
            ...paragraphs.map(paragraph => paragraph.innerText.replace(/https?:\/\/[^\s]+/g, ""))
        ].join(" ");

        return (title + " " + content).slice(0, 1000);
    },

    generate() {
        this.aiShowAnimation(this.fetch(this.getTitleAndContent(), this.config.key));
    },

    async fetch(content, key) {
        const params = new URLSearchParams({
            content: content,
            key: key,
            url: window.location.href
        });
        const url = `${this.root}/?${params.toString()}`;

        try {
            const abortController = new AbortController();
            const response = await fetch(url, {signal: abortController.signal});
            if (response.ok) {
                const data = await response.json();
                this.aiPostExplanation = data.summary;
                return data.summary;
            }
            throw Error("Request failed");
        } catch (error) {
            if (error.name === "AbortError") {
                console.error("Request timed out");
            } else {
                console.error("Request failed:", error);
            }
            return "获取文章摘要超时。当你出现这个问题时，可能是因为文章过长导致的AI运算量过大， 您可以稍等一下然后重新尝试。";
        }
    },

    aiShowAnimation(promise, createSuggestions = false) {
        const explanationElement = document.querySelector(".ai-explanation");
        const aiTagElement = document.querySelector(".ai-tag");

        if (!explanationElement || this.scoGPTIsRunning) {
            return;
        }
        this.scoGPTIsRunning = true;
        this.cleanSuggestions();
        aiTagElement.classList.add("loadingAI");
        explanationElement.style.display = "block";
        explanationElement.innerHTML = '生成中...<span class="blinking-cursor"></span>';

        let startTime, animationFrameCallback, isIntersecting = true, index = 0, isFirstRun = true;
        const observer = new IntersectionObserver((entries) => {
            isIntersecting = entries[0].isIntersecting;
            if (isIntersecting) {
                requestAnimationFrame(animationFrameCallback);
            }
        }, {threshold: 0});

        promise.then((text) => {
            startTime = performance.now();
            animationFrameCallback = () => {
                if (index < text.length && isIntersecting) {
                    const currentTime = performance.now();
                    const deltaTime = currentTime - startTime;
                    const currentChar = text.slice(index, index + 1);
                    const isPunctuation = /[，。！、？,.!?]/.test(currentChar);
                    const isAlphanumeric = /[a-zA-Z0-9]/.test(currentChar);
                    const delay = isPunctuation ? 100 * Math.random() + 100 : isAlphanumeric ? 10 : 25;

                    if (deltaTime >= delay) {
                        explanationElement.innerText = text.slice(0, index + 1);
                        startTime = currentTime;
                        index++;

                        if (index < text.length) {
                            explanationElement.innerHTML = text.slice(0, index) + '<span class="blinking-cursor"></span>';
                        } else {
                            explanationElement.innerHTML = text;
                            explanationElement.style.display = "block";
                            this.scoGPTIsRunning = false;
                            aiTagElement.classList.remove("loadingAI");
                            observer.disconnect();

                            if (createSuggestions) {
                                this.createSuggestions();
                            }
                        }
                    }

                    if (isIntersecting) {
                        requestAnimationFrame(animationFrameCallback);
                    }
                }
            };

            if (isIntersecting && isFirstRun) {
                setTimeout(() => {
                    requestAnimationFrame(animationFrameCallback);
                    isFirstRun = false;
                }, 3000);
            }

            observer.observe(explanationElement);
        }).catch((error) => {
            console.error("检索信息失败：", error);
            explanationElement.innerHTML = "检索信息失败";
            explanationElement.style.display = "block";
            this.scoGPTIsRunning = false;
            aiTagElement.classList.remove("loadingAI");
            observer.disconnect();
        });
    },

    AIEngine() {
        const aiTagElement = document.querySelector(".ai-tag");
        if (aiTagElement) {
            aiTagElement.addEventListener("click", () => {
                if (!this.scoGPTIsRunning) {
                    this.aiTalkMode = true;
                    this.aiShowAnimation(Promise.resolve(this.config.talk), true);
                }
            });
        } else {
            console.error('Element with class ".ai-tag" not found');
        }
    },

    cleanSuggestions() {
        const suggestionsElement = document.querySelector(".ai-suggestions");
        if (suggestionsElement) {
            suggestionsElement.innerHTML = "";
        } else {
            console.error("没有这个元素：'ai-suggestions'");
        }
    },

    createSuggestions() {
        this.aiTalkMode && this.cleanSuggestions()
        this.createSuggestionItemWithAction("这篇文章讲了什么？", (() => {
            this.aiShowAnimation(Promise.resolve(this.aiPostExplanation), !0)
        }))
        this.aiTalkMode = !0
    },

    createSuggestionItemWithAction(text, action) {
        const container = document.querySelector(".ai-suggestions");
        if (!container) {
            console.error("无法找到具有class为ai-suggestions的元素");
            return;
        }
        const item = document.createElement("div");
        item.classList.add("ai-suggestions-item");
        item.textContent = text;
        item.addEventListener("click", action);
        container.appendChild(item);
    }
}
ScoPostAi.init(scoConfig);
console.log("%c🔥 程序：ScoAI | 作者：王卓Sco ｜ 地址: https://github.com/wleelw 🤖️", "color:#fff; background: linear-gradient(270deg, #18d7d3, #68b7dd, #8695e6, #986fee); padding: 8px 15px; border-radius: 8px");