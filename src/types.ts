export type TrackType = 'python' | 'interactive';
export type PythonLibrary = 'matplotlib' | 'seaborn' | 'plotly' | 'combined';
export type InteractiveTool = 'powerbi' | 'tableau' | 'streamlit' | 'other';

export interface Dataset {
  id: string;
  title: string;
  category: string;
  kaggleSlug: string;
  kaggleUrl: string;
  description: string;
  recordCount: string;
  fileSize: string;
  badgeColor: string;
  iconName: string;
  columns: { name: string; type: string; desc: string }[];
  sampleRows: Record<string, string | number>[];
  suggestedQuestions: string[];
  pythonStarters: {
    library: 'matplotlib' | 'seaborn' | 'plotly';
    title: string;
    description: string;
    code: string;
  }[];
}

export interface JudgeScore {
  judgeId: string;
  judgeName: string;
  judgeRole: string; // e.g., 'Head of Dept (CSE)', 'Senior Data Scientist @ TechCorp'
  question1Score: number; // max 33
  question2Score: number; // max 33
  question3Score: number; // max 34
  totalScore: number; // max 100
  comments: string;
  specialAwards?: string[];
  ratedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: 'student' | 'admin' | 'judge';
  collegeRollNo: string;
  department: string;
  yearOfStudy: string;
  bio?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  preferredTools: string[];
  avatarSeed: string;
  avatarColor: string;
  joinedAt: string;
}

export interface HackathonState {
  hackathonStarted: boolean;
  submissionsOpen: boolean;
}

export interface Submission {
  id: string;
  userId?: string;
  title: string;
  studentName: string;
  teamId?: string;
  teamName?: string;
  teamMembers?: string[];
  collegeRollNo: string;
  department: string;
  yearOfStudy: string;
  datasetId: string;
  datasetTitle: string;
  track: TrackType;
  pythonLibraries?: PythonLibrary[];
  interactiveTool?: InteractiveTool;
  
  // Visual files
  imageUrl: string; // PNG/JPG preview or data URI
  imageFileName: string;
  
  // Interactive visualization files / links
  dashboardFileUrl?: string;
  dashboardFileName?: string;
  dashboardFileType?: string;
  externalLink?: string; // Tableau Public, Power BI Web, GitHub repo
  
  // Content & insights
  keyInsights: string[];
  pythonCode?: string;
  methodology: string;
  
  // Timing & Status
  submittedAt: string;
  status: 'pending_review' | 'scored' | 'featured';
  
  // Scores
  scores: JudgeScore[];
  averageScore: number;
  rank?: number;
  specialBadges?: string[];
}

export interface Team {
  id: string;
  name?: string;
  creatorId: string;
  creatorRollNo: string;
  creatorName: string;
  invitedRollNo: string;
  invitedId?: string;
  invitedName?: string;
  status: 'pending' | 'accepted';
  createdAt: string;
}

export interface PrizeItem {
  rank: string;
  title: string;
  reward: string;
  trophy: string;
  description: string;
  color: string;
  icon: string;
}
