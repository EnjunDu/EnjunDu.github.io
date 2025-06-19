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

        1. **AI-Driven Science**: Leveraging advanced artificial intelligence techniques to tackle complex scientific challenges, this research promotes interdisciplinary innovation and discovery that unveil novel scientific insights.  
        
        2. **Data-Centric Learning**: Integrating universal graph models with large language models to significantly enhance data quantity, quality, efficiency, and privacy. This approach aims to optimize the robustness and scalability of machine learning systems for real-world applications. 

        3. **Knowledge-Integrated LLMs**: Merging domain-specific knowledge with large language models to fortify their reasoning capabilities and adaptability, ultimately striving to develop more efficient and universally applicable intelligent solutions.

        Here are some of my research works. If you have any questions about them or would like to connect and explore new ideas together, I welcome the discussion. Please reach out to collaborate! 😃
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
    content:
      count: 114514
      title: Publications
      text: ""
      filters:
        folders:
          - publication
        exclude_featured: false
    design:
      view: citation
  - block: markdown
    content:
      title: '📝 Reviewer Experience'
      subtitle: ''
      text: |-
        ### Journals
        - **TIST in 2024**: ACM Transactions on Intelligent Systems and Technology
        - **TCSS in 2025**: IEEE Transactions on Computational Social Systems

        
        ### Conferences
        - **ICML 2025**: International Conference on Machine Learning
        - **ARR 2025**: Association for Computational Linguistics Rolling Review
        - **NeurIPS 2025**: Neural Information Processing Systems


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
      # Page type to display. E.g. post, talk, publication...
      page_type: post
      # Choose how many pages you would like to display (0 = all pages)
      count: 0
      # Filter on criteria
      filters:
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      # Choose how many pages you would like to offset by
      offset: 0
      # Page order: descending (desc) or ascending (asc) date.
      order: desc
    design:
      # Choose a layout view
      view: date-title-summary
      # Reduce spacing
      spacing:
        padding: [0, 0, 0, 0]

  - block: markdown
    content:
      title: "Contact Me"
      id: contact-me
      subtitle: ""
      text: |-
        I genuinely believe that meaningful progress in academia stems from open dialogue and thoughtful debate. If you have ideas to share, constructive feedback on my work, or fresh perspectives you'd like to explore together, I would truly appreciate hearing from you.

        If you have any questions about my research—or if you’ve previously contacted me through GitHub issues and haven’t received a response—please feel free to reach out via email. I'm always happy to chat, collaborate, or offer assistance where I can.

        **Preferred Email**:  
        - [EnjunDu.cs@gmail.com](mailto:EnjunDu.cs@gmail.com)

        **Optional Email**:  
        - [edu719@connect.hkust-gz.edu.cn](mailto:edu719@connect.hkust-gz.edu.cn)

        *Please avoid contacting me at* `enjun_du@bit.edu.cn`, *as I will no longer have access to this address after June 2026.*
    design:
      columns: "1"
---
