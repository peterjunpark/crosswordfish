<div align="center">
  <h1 align="center" id="top">Crosswordfish</h1>
  
  [![Next][Next.js]][Next-url] [![React][React.js]][React-url]

  <a href="#About">About</a> / 
  <a href="#Installation">Installation</a> / 
  <a href="#Roadmap">Roadmap</a>
</div>

## About

![Crosswordfish screenshot](https://github.com/peterjunpark/crosswordfish/assets/115042610/39b11d45-e10f-4e50-a782-c83851c40931)

Crosswordfish is a hack-y attempt at building a crossword app for enthusiasts.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built with

These are the main technologies used in Crosswordfish:

* [React](https://react.dev)
* [Next.js 14 (App router)](https://nextjs.org)
* [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
* [shadcn/ui](https://ui.shadcn.com)
* [OpenAI](https://openai.com)
<p align="right">(<a href="#top">back to top</a>)</p>

## Installation

To get a local copy of Crosswordfish up and running, follow these steps:

### Prerequisites

* Install [Node.js](https://nodejs.org)
* Install [pnpm](https://pnpm.io/installation)
  ```sh
  npm i -g pnpm
  ```
* Obtain a valid [OpenAI API key](https://platform.openai.com/api-keys)

### Getting started

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/peterjunpark/crosswordfish.git
   ```
2. Install dependencies via pnpm
   ```sh
   cd crosswordfish
   pnpm i
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key.
   ```
   OPEN_AI_API_KEY= ...
   ```
4. Start the development server
   ```sh
   pnpm dev
   ```
5. Navigate to `http://localhost:3001` and play some crosswords 😁

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>


## Roadmap

A running list of the main features to be added to Crosswordfish.

- [x] Add crossword grid generation
    - [ ] Support for American-style grids 
    - [x] Support for freeform crossword grids     
- [x] Add crossword clues generation using GPT-3.5
    - [x] Support for American-style crossword clues
    - [ ] Support for cryptic (British-style) crossword clues
- [x] Add keyboard controls
- [ ] Add ability to save, share, download, and print crosswords
- [ ] Add crossword creation and publishing

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

This project will likely not be updated. I intend to rebuild Crosswordfish using the lessons learned here.

Feel free to fork the project for your own purposes.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
