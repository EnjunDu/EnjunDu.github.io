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
        My research lies at the intersection of **Long-Video Understanding, Audio-Visual Omni Understanding, World Models, and Agentic Multimodal AI**. Concretely, I study how multimodal agents can understand long-form videos through **multi-turn interactive reasoning**, continuously integrate audio-visual information in streaming scenarios, and build predictive internal representations of evolving visual and acoustic dynamics. My research spans long-video understanding and reasoning, audio-video omni streaming understanding, multimodal retrieval and memory, world model learning, and agentic multimodal systems. My long-term vision is to make multimodal agents capable of not only perceiving what is happening, but also reasoning about what has happened, what is happening now, and what may happen next—enabling more faithful, grounded, and compute-efficient intelligence for long-horizon real-world decision-making under uncertainty.

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
  - block: publications
    id: papers
    content:
      title: Publications
  - block: patents
    id: patents
    content:
      title: '📜 Patents'
      subtitle: ''
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
      columns: 3
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
