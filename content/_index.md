---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
      # Show a call-to-action button under your biography? (optional)
      button:
        text: Download CV
        #url: uploads/resume.pdf
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: stacked-peaks.svg
          filters:
            brightness: 1.0
          size: cover
          position: center
          parallax: false
  - block: markdown
    content:
      title: '📚 My Research'
      subtitle: ''
      text: |-
        My research lies at the intersection of **World Models, Agentic Reinforcement Learning, and Multimodal Large Language Models**. I aim to build multimodal agents that go beyond perceiving the world—agents that can imagine it. Concretely, I study how to teach MLLMs to invoke world models as internal simulators, mentally rolling out future states before committing to an answer or an action, and how to train this imagination capability through reinforcement learning so the agent learns when to imagine, how deeply to imagine, and how to trust what it imagines. My long-term vision is to make imagination a first-class citizen of multimodal reasoning, enabling agents that are not only more capable, but also faithful, grounded, and compute-efficient—reliable enough to be trusted in long-horizon, real-world decision making under limited compute.

        Here are some of my research works.
    design:
      columns: '1'
  - block: collection
    id: news
    content:
      title: Recent News
      count: 6
      subtitle: ''
      text: ''
  - block: collection
    id: papers
    content:
      title: Publications
      count: 114514
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: citation
  - block: collection
    id: more-publications
    content:
      title: ""
      count: 114514
      filters:
        folders:
          - publication
        exclude_featured: true
    design:
      view: citation
  - block: markdown
    id: patents
    content:
      title: '📜 Patents'
      subtitle: ''
      text: |-
        <div style="max-width:900px; margin:0 auto;">
        <div class="patent-item" style="margin-bottom:1.25rem; padding:1rem 1.25rem; border:1px solid #e5e7eb; border-radius:8px; background:#fff;">
        <h4 style="margin:0 0 0.4rem 0; font-size:1.05rem; font-weight:700; color:#111827; line-height:1.4;">Reply Generation Method, Apparatus, Computer Device, and Storage Medium</h4>
        <p style="margin:0; font-size:0.9rem; color:#374151; line-height:1.5;"><strong>Enjun Du</strong>, Xinyu Zuo, Lisheng Duan, Yongqi Zhang</p>
        </div>
        <div class="patent-item" style="margin-bottom:1.25rem; padding:1rem 1.25rem; border:1px solid #e5e7eb; border-radius:8px; background:#fff;">
        <h4 style="margin:0 0 0.4rem 0; font-size:1.05rem; font-weight:700; color:#111827; line-height:1.4;">Image Retrieval Method, Apparatus, Computer Device, Storage Medium, and Product</h4>
        <p style="margin:0; font-size:0.9rem; color:#374151; line-height:1.5;"><strong>Enjun Du</strong>, Xinyu Zuo, Lisheng Duan, Ruiwen Tao, Yongqi Zhang</p>
        </div>
        <div id="more-patents" style="display:none;">
        <div class="patent-item" style="margin-bottom:1.25rem; padding:1rem 1.25rem; border:1px solid #e5e7eb; border-radius:8px; background:#fff;">
        <h4 style="margin:0 0 0.4rem 0; font-size:1.05rem; font-weight:700; color:#111827; line-height:1.4;">A Knowledge Graph Reasoning Method, Apparatus, Device, and Medium</h4>
        <p style="margin:0; font-size:0.9rem; color:#374151; line-height:1.5;">Yongqi Zhang, <strong>Enjun Du</strong>, Siyi Liu</p>
        </div>
        <div class="patent-item" style="margin-bottom:1.25rem; padding:1rem 1.25rem; border:1px solid #e5e7eb; border-radius:8px; background:#fff;">
        <h4 style="margin:0 0 0.4rem 0; font-size:1.05rem; font-weight:700; color:#111827; line-height:1.4;">A Training Method for Retrieval Models and Related Apparatus</h4>
        <p style="margin:0; font-size:0.9rem; color:#374151; line-height:1.5;">Siyi Liu, <strong>Enjun Du</strong>, Zirong Chen, Xinyu Zuo, Lisheng Duan, Yongqi Zhang</p>
        </div>
        <div class="patent-item" style="margin-bottom:1.25rem; padding:1rem 1.25rem; border:1px solid #e5e7eb; border-radius:8px; background:#fff;">
        <h4 style="margin:0 0 0.4rem 0; font-size:1.05rem; font-weight:700; color:#111827; line-height:1.4;">A Data Processing Method, Apparatus, Electronic Device, and Readable Medium</h4>
        <p style="margin:0; font-size:0.9rem; color:#374151; line-height:1.5;">Zirong Chen, Fuda Ye, <strong>Enjun Du</strong>, Junfu Pu, Xinyu Zuo, Yongqi Zhang</p>
        </div>
        <div class="patent-item" style="margin-bottom:1.25rem; padding:1rem 1.25rem; border:1px solid #e5e7eb; border-radius:8px; background:#fff;">
        <h4 style="margin:0 0 0.4rem 0; font-size:1.05rem; font-weight:700; color:#111827; line-height:1.4;"><a href="https://patents.google.com/patent/CN119180288A/en" style="color:inherit; text-decoration:none;" onmouseover="this.style.color='#2563eb'" onmouseout="this.style.color='inherit'">Intent-Aware Session Recommendation Based on Behavior-Enhanced Hypergraph Modeling</a></h4>
        <p style="margin:0 0 0.3rem 0; font-size:0.9rem; color:#374151; line-height:1.5;">Wenhao Xue, Zhida Qin, Haoyao Zhang, Shixiao Yang, <strong>Enjun Du</strong>, Xingbo Tian, Shuang Li, Tianyu Huang</p>
        <p style="margin:0; font-size:0.82rem; color:#6b7280; font-style:italic;">Chinese National Invention Patent, CN119180288A, published December 2024.</p>
        </div>
        </div>
        <div style="text-align:center; margin-top:0.5rem;">
        <button id="patents-toggle-btn" onclick="(function(){var m=document.getElementById('more-patents');var b=document.getElementById('patents-toggle-btn');if(m.style.display==='none'){m.style.display='block';b.innerText='Show less';}else{m.style.display='none';b.innerText='Show more';}})()" style="padding:0.4rem 1rem; border-radius:999px; background:#eff6ff; color:#1d4ed8; font-size:0.85rem; font-weight:600; border:1px solid #bfdbfe; cursor:pointer;">Show more</button>
        </div>
        </div>
    design:
      columns: '1'
  - block: markdown
    content:
      title: '📝 Reviewer Experience'
      subtitle: ''
      text: |-
        
        - **Journals**: ACM TIST, IEEE TCSS
        - **Conferences**: ACL Rolling Review, ICML, NeurIPS, AAAI, ICLR

    design:
      columns: '1'
  - block: collection
    id: talks
    content:
      title: Talks
      filters:
        folders:
          - event
    design:
      view: article-grid
      columns: 1
  - block: resume-experience
    id: experience
    content:
      title: Experience
      username: admin
    design:
      date_format: 'January 2006'
      is_education_first: false
  - block: resume-skills
    content:
      title: Skills & Hobbies
      username: admin
    design:
      show_skill_percentage: false
  - block: resume-awards
    content:
      title: Awards
      username: admin
  - block: resume-languages
    content:
      title: Languages
      username: admin
  - block: markdown
    id: contact-me
    content:
      title: "Contact Me"
      subtitle: ""
      text: |-
        I genuinely believe that meaningful progress in academia stems from open dialogue and thoughtful debate. If you have any questions about my research--or if you've previously contacted me through GitHub issues and haven't received a response--please feel free to reach out via email. I'm always happy to chat, collaborate, or offer assistance where I can.

        Throughout my academic journey, I've been fortunate to receive support and inspiration from many generous people. I'm always eager to give back to the community and engage with others passionate about learning and discovery.

        **Preferred Email**:  
        - [EnjunDu.cs@gmail.com](mailto:EnjunDu.cs@gmail.com)

        **Optional Email**:  
        - [edu719@connect.hkust-gz.edu.cn](mailto:edu719@connect.hkust-gz.edu.cn), [enjundu@tencent.com](mailto:enjundu@tencent.com)

        *Please avoid contacting me at* `enjun_du@bit.edu.cn`, *as I will no longer have access to this address.*
---
