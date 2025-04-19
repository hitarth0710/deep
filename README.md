# MaskOff: Advanced Deepfake Detection Platform

![License](https://img.shields.io/github/license/hitarth0710/deep)
![Issues](https://img.shields.io/github/issues/hitarth0710/deep)
![Stars](https://img.shields.io/github/stars/hitarth0710/deep)

## Overview

MaskOff is a comprehensive web application designed to detect and analyze deepfake content across multiple media formats. The platform leverages advanced AI algorithms to identify manipulated videos and images with high accuracy, helping combat the growing threat of digital misinformation. With an intuitive user interface and powerful backend processing, MaskOff provides detailed analysis reports and visual indicators of potentially fake content.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Video Deepfake Detection**: Advanced frame-by-frame analysis of video content
- **Image Deepfake Detection**: Precise analysis of potentially AI-generated or manipulated images
- **Face Detection**: Automatic identification and analysis of faces in media content
- **Confidence Scoring**: Detailed probability metrics for deepfake likelihood
- **Visual Analysis Results**: Intuitive visualization of manipulation detection
- **Real-time Processing**: Progress tracking during content analysis
- **User Authentication**: Secure account management via Supabase
- **Responsive Dashboard**: User-friendly interface for all device sizes

## Technologies

### Frontend
- TypeScript with React
- Tailwind CSS for styling
- File upload handling with progress tracking
- Interactive visualization components

### Backend
- Django for API and server-side processing
- TensorFlow/PyTorch for ML model implementation
- OpenCV for image and video processing
- MTCNN for facial detection

### Tools & Infrastructure
- npm/yarn for package management
- Git for version control
- Supabase for authentication

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.x or later)
- [npm](https://www.npmjs.com/) (v8.x or later) or [yarn](https://yarnpkg.com/)
- [Python](https://www.python.org/) (v3.8 or later)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/hitarth0710/deep.git
   cd deep
   ```

2. Install Frontend dependencies
   ```bash
   cd src
   npm install
   # or if you use yarn
   yarn install
   ```

3. Set up Python environment for Backend(Recommended Python 3.8)
   ```bash
   cd ../Django\ Application
   
   # Create a virtual environment
   python -m venv venv
   
   # Activate the virtual environment
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   
   # Install Python dependencies
   pip install -r requirements.txt
   ```

4. Set up ML models(Use model from [Hugging Face](https://huggingface.co/MaanVad3r/DeepFake-Detector))
   ```bash
   # Make sure the models directory exists
   mkdir -p ml_app/models
   
   # Download required model files (specific instructions would depend on your model sources)
   ```

## Usage

### Development Mode

1. Start the Django backend server
   ```bash
   cd Django\ Application
   python manage.py runserver
   ```

2. Start the React development server (in a new terminal)
   ```bash
   cd src
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Testing the Deepfake Detection

1. Upload a video or image through the respective analysis pages
2. View real-time analysis progress
3. Examine the detailed results, including:
   - Overall fake/real classification
   - Confidence percentage
   - Frame-by-frame analysis (for videos)
   - Face detection metrics

## Demo

<div align="center">
  <h3>MaskOff Demo</h3>
  <p>A video demonstration of the deepfake detection platform in action.</p>
  
  
[Demo](https://github.com/user-attachments/assets/e636611f-364e-420e-bfb8-85df439a0fa0)

</div>

## Project Structure

```
deep/
├── Django Application/    # Backend server & ML pipeline
│   ├── ml_app/            # ML models and processing logic
│   │   ├── models/        # Deepfake detection models
│   │   ├── views.py       # API endpoints
│   │   └── utils.py       # Helper functions
│   └── project_settings/  # Django configuration
├── src/                   # Frontend React application
│   ├── components/        # UI components
│   │   ├── analyze.tsx    # Analysis components
│   │   ├── dashboard.tsx  # User dashboard
│   │   └── ...
│   ├── pages/             # Application pages
│   │   ├── video-detection.tsx
│   │   ├── image-detection.tsx
│   │   └── ...
│   ├── contexts/          # React contexts
│   ├── lib/               # Utilities and helpers
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── README.md              # This file
```

## Contributing

We welcome contributions to MaskOff! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

Please ensure your code follows our coding standards and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE).

---

Created by [hitarth0710](https://github.com/hitarth0710) with contributions from:
- [Harsh Kadecha](https://github.com/HarshKadecha11) - ML model implementation
- [Harshil Vadalia](https://github.com/harshilvadalia) - Frontend architecture
- [Shivansh Srivantava](https://github.com/ShivanshSrivastava136) - Backend development
