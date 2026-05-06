export interface ModuleScore {
  pre: number;
  post: number;
  lgi: number;
}

export interface CapabilityScores {
  knowledge: number;
  communication: number;
  activeLearning: number;
  timeManagement: number;
  satisfaction: number;
  utilityTools: number;
}

export interface TrainerData {
  id: string;
  name: string;
  periode: string;
  program: string;
  nik: string;
  homebase: string;
  position: string;
  avatarUrl: string;
  participants: number;
  dateRange: string;
  passRate: number;
  feedbackScore: number;
  feedbackText: string;
  capabilities: CapabilityScores;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  modules: {
    [key: string]: ModuleScore;
  };
  total: ModuleScore;
}

export interface RawDataSample {
  tgl: string;
  nama: string;
  nik: string;
  prog: string;
  materi: string;
  trainer: string;
  pre: number;
  post: number;
  lgi: number;
}

export const MODULE_NAMES = ["MNR", "5R", "QC", "FLOOR", "PAYROLL", "TRAINER"];
export const PROGRAMS = ["TOS", "SOS", "MOS"];

export const INITIAL_DATA: TrainerData[] = [
  {
    id: "1",
    name: "FERNANDA PUTRI CRISMONICA",
    periode: "Apr 26",
    program: "TOS",
    nik: "1036782",
    homebase: "Jakarta Barat",
    position: "REGULAR TRAINING JUNIOR MANAGER",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda",
    participants: 20,
    dateRange: "03 - 05 April 2026",
    passRate: 80.00,
    feedbackScore: 89,
    feedbackText: "Peserta merasa puas dengan penyampaian materi oleh Trainer yang jelas, mudah dimengerti dan dapat menciptakan suasana belajar yang menyenangkan. Saran untuk lebih meningkatkan interaksi dengan peserta seperti mengadakan sesi tanya jawab.",
    capabilities: {
      knowledge: 89.81,
      communication: 89.43,
      activeLearning: 87.92,
      timeManagement: 86.79,
      satisfaction: 87.55,
      utilityTools: 90.94
    },
    strengths: "Penguasaan materi yang sangat baik dan mampu membawakan kelas dengan energi positif.",
    weaknesses: "Dua aspek yang perlu ditingkatkan yaitu manajemen waktu dan kemampuan menjawab pertanyaan peserta.",
    opportunities: "Kemampuan mengoperasikan tools online baik dapat dimanfaatkan untuk mengembangkan sesi pelatihan yang lebih interaktif.",
    modules: {
      MNR: { pre: 48.87, post: 81.57, lgi: 63.95 },
      "5R": { pre: 66.78, post: 86.96, lgi: 60.73 },
      QC: { pre: 80.00, post: 89.39, lgi: 46.96 },
      FLOOR: { pre: 90.78, post: 93.74, lgi: 32.08 },
      PAYROLL: { pre: 81.22, post: 96.87, lgi: 83.33 },
      TRAINER: { pre: 93.91, post: 96.52, lgi: 42.86 },
    },
    total: { pre: 80.62, post: 92.04, lgi: 58.95 },
  },
  {
    id: "2",
    name: "FERNANDA PUTRI CRISMONICA",
    periode: "May 26",
    program: "TOS",
    nik: "1036783",
    homebase: "Jakarta Selatan",
    position: "SENIOR TRAINER SPECIALIST",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riki",
    participants: 25,
    dateRange: "10 - 12 Mei 2026",
    passRate: 92.00,
    feedbackScore: 94,
    feedbackText: "Trainer sangat komunikatif dan mampu menghidupkan suasana kelas. Penjelasan sangat detail dan mudah diaplikasikan.",
    capabilities: {
      knowledge: 92.50,
      communication: 95.00,
      activeLearning: 90.00,
      timeManagement: 88.00,
      satisfaction: 94.00,
      utilityTools: 85.00
    },
    strengths: "Kemampuan komunikasi publik yang luar biasa dan pemahaman teknis yang mendalam.",
    weaknesses: "Kadang terlalu fokus pada detail sehingga beberapa materi akhir perlu dipercepat.",
    opportunities: "Potensi menjadi lead trainer untuk modul-modul baru yang memerlukan penyampaian kompleks.",
    modules: {
      MNR: { pre: 86.67, post: 90.67, lgi: 30.00 },
      "5R": { pre: 97.33, post: 94.67, lgi: -100.00 },
      QC: { pre: 92.67, post: 100.00, lgi: 100.00 },
      FLOOR: { pre: 93.33, post: 100.00, lgi: 100.00 },
      PAYROLL: { pre: 68.67, post: 86.67, lgi: 57.45 },
      TRAINER: { pre: 69.33, post: 86.67, lgi: 56.52 },
    },
    total: { pre: 85.13, post: 94.33, lgi: 61.88 },
  },
  {
    id: "3",
    name: "ADITYA FIRNANDO",
    periode: "Jun 26",
    program: "SOS",
    nik: "1036784",
    homebase: "Jakarta Timur",
    position: "TRAINING SUPERVISOR",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya",
    participants: 18,
    dateRange: "15 - 17 Juni 2026",
    passRate: 85.00,
    feedbackScore: 88,
    feedbackText: "Materi yang disampaikan sangat relevan dengan kebutuhan lapangan. Trainer sangat sabar dalam membimbing.",
    capabilities: {
      knowledge: 85.00,
      communication: 88.00,
      activeLearning: 82.00,
      timeManagement: 90.00,
      satisfaction: 87.00,
      utilityTools: 80.00
    },
    strengths: "Kesabaran luar biasa dan pendekatan personal kepada peserta yang tertinggal.",
    weaknesses: "Penggunaan media interaktif digital masih bisa ditingkatkan.",
    opportunities: "Dapat dikembangkan untuk modul coaching 1-on-1 bagi staf baru.",
    modules: {
      MNR: { pre: 60, post: 85, lgi: 62.5 },
      "5R": { pre: 70, post: 90, lgi: 66.67 },
      QC: { pre: 85, post: 95, lgi: 66.67 },
      FLOOR: { pre: 80, post: 90, lgi: 50 },
      PAYROLL: { pre: 75, post: 85, lgi: 40 },
      TRAINER: { pre: 80, post: 90, lgi: 50 },
    },
    total: { pre: 75.00, post: 89.17, lgi: 56.68 },
  },
];

export const RAW_SAMPLES: RawDataSample[] = [
  { tgl: "03 Apr 2026", nama: "AHMAD BAIHAQI", nik: "2024001", prog: "TOS", materi: "MNR", trainer: "FERNANDA PUTRI", pre: 45, post: 85, lgi: 0.72 },
  { tgl: "03 Apr 2026", nama: "SITI AMINAH", nik: "2024002", prog: "TOS", materi: "5R", trainer: "FERNANDA PUTRI", pre: 60, post: 90, lgi: 0.75 },
  { tgl: "04 Apr 2026", nama: "BUDI SANTOSO", nik: "2024003", prog: "TOS", materi: "QC", trainer: "FERNANDA PUTRI", pre: 75, post: 95, lgi: 0.80 },
  { tgl: "10 Mei 2026", nama: "DIMAS PRAYOGA", nik: "2024004", prog: "TOS", materi: "MNR", trainer: "RIKI RIZKHAN", pre: 80, post: 95, lgi: 0.75 },
  { tgl: "10 Mei 2026", nama: "EKO WAHYUDI", nik: "2024005", prog: "TOS", materi: "PAYROLL", trainer: "RIKI RIZKHAN", pre: 65, post: 92, lgi: 0.77 },
  { tgl: "15 Jun 2026", nama: "FARHAN AZIZ", nik: "2024006", prog: "SOS", materi: "MNR", trainer: "ADITYA FIRNANDO", pre: 55, post: 88, lgi: 0.73 },
  { tgl: "15 Jun 2026", nama: "GITA PERTIWI", nik: "2024007", prog: "SOS", materi: "5R", trainer: "ADITYA FIRNANDO", pre: 70, post: 95, lgi: 0.83 },
  { tgl: "16 Jun 2026", nama: "HARI KUSUMA", nik: "2024008", prog: "SOS", materi: "FLOOR", trainer: "ADITYA FIRNANDO", pre: 85, post: 98, lgi: 0.86 },
];
