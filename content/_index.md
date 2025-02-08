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
        url: uploads/resume.pdf
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
        My current research interests are in large language models and graph neural networks. Here are some of my research works. If you have any questions about them or would like to connect and explore new ideas together, I welcome the discussion.
        Please reach out to collaborate 😃
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
    id: experience  # 添加 id 便于导航
    content:
      title: Experience  # 添加标题
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


---
