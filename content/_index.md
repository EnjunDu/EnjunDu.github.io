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
        My current research interests are:

        1. **Graph for LLM**: Graph RAG, Graph-Enhanced LLM
        
        2. **LLM Reasoning**: MLLM, RL-LLM

        3. **Data Mining**: Data-Centric AI, Knowledge Graph Reasoning
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
      title: Featured Publications
      count: 114514
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: article-grid
      columns: 2
  - block: collection
    id: papers
    content:
      title: Selected Publications
      count: 114514
      text: ""
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: citation

  - block: collection
    id: publications
    content:
      title: Other Publications
      count: 114514
      text: ""
      filters:
        folders:
          - publication
        exclude_featured: true
    design:
      view: citation
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

        That said, I'm not interested in discussions centered around citation counts, publication metrics, or quantitative comparisons between individuals. If your outreach is primarily motivated by such metrics, I kindly ask that you refrain from contacting me. I'm most interested in conversations about meaningful problems, creative solutions, and insightful ideas.

        **Preferred Email**:  
        - [EnjunDu.cs@gmail.com](mailto:EnjunDu.cs@gmail.com)

        **Optional Email**:  
        - [edu719@connect.hkust-gz.edu.cn](mailto:edu719@connect.hkust-gz.edu.cn), [enjundu@tencent.com](mailto:enjundu@tencent.com)

        *Please avoid contacting me at* `enjun_du@bit.edu.cn`, *as I will no longer have access to this address.*
---
