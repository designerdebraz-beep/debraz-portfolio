"use client";

import { useState, useEffect, useRef } from "react";

const LOGO_IMG = "/debraz-logo.png"

const PROFILE_IMG = "/debraz pu.jpeg"

const NAV_LINKS = ["Home","About","Skills","Education","Experience","Projects","Contact"];

const SKILLS = {
  Frontend: [
    {name:"HTML",level:95},{name:"CSS",level:90},{name:"JavaScript",level:88},
    {name:"TypeScript",level:78},{name:"React",level:85},{name:"Next.js",level:82},
    {name:"Tailwind CSS",level:90}
  ],
  Backend: [
    {name:"Node.js",level:80},{name:"Express.js",level:78},{name:"MongoDB",level:75},
    {name:"Firebase",level:70},{name:"REST API",level:85}
  ],
  WordPress: [
    {name:"Elementor",level:92},{name:"WooCommerce",level:88},{name:"Theme Customization",level:90}
  ],
  Tools: [
    {name:"Git",level:85},{name:"GitHub",level:88},{name:"Figma",level:80},{name:"Photoshop",level:82}
  ]
};

const EDUCATION = [
  {degree:"Bachelor's Degree",institution:"Institution Name",year:"2020 – 2024",desc:"Completed undergraduate studies with a focus on Computer Science and Software Engineering."},
  {degree:"HSC",institution:"Institution Name",year:"2018 – 2020",desc:"Higher Secondary Certificate with concentration in Science."},
  {degree:"SSC",institution:"Institution Name",year:"2016 – 2018",desc:"Secondary School Certificate, foundation in Mathematics and Sciences."}
];

const EXPERIENCE = [
  {
    role:"WordPress Developer",company:"Freelance",period:"2022 – Present",
    duties:["Custom website development for clients","E-commerce solutions with WooCommerce","Landing page design and optimization","Performance and SEO improvements"]
  },
  {
    role:"Graphic Design Trainer",company:"Government Project",period:"2022 – 2023",
    duties:["Trained 100+ students in Photoshop & Illustrator","Conducted hands-on workshops","Developed comprehensive course materials","Provided career guidance to graduates"]
  }
];

const PROJECTS = [
  {
    id:1,name:"Mentora",tagline:"Online Tutor Booking Platform",
    desc:"A full-stack platform connecting students with expert tutors. Features real-time booking, video sessions, and progress tracking.",
    tech:["Next.js","MongoDB","Express.js","Tailwind CSS","Socket.io"],
    color:"#0ea5e9",
    challenges:["Real-time session management","Payment gateway integration","Scalable video calling API"],
    features:["Smart tutor matching","Live video sessions","Progress dashboard","Secure payments"],
    future:["Mobile app","AI-powered tutor recommendations","Gamification system"],
    live:"#", github:"#",
    emoji:"📚"
  },
  {
    id:2,name:"MediQueue",tagline:"Doctor Appointment System",
    desc:"A healthcare management platform for booking and managing doctor appointments with automated reminders and patient records.",
    tech:["React","Node.js","Firebase","Tailwind CSS","Express.js"],
    color:"#10b981",
    challenges:["HIPAA-compliant data storage","Calendar sync across time zones","Notification system at scale"],
    features:["One-click booking","Doctor availability calendar","Prescription history","SMS reminders"],
    future:["Telemedicine module","Insurance billing","AI symptom checker"],
    live:"#", github:"#",
    emoji:"🏥"
  },
  {
    id:3,name:"SkyBuyBD",tagline:"China Product Import Platform",
    desc:"An e-commerce import platform that streamlines purchasing from Chinese suppliers for Bangladeshi buyers, with real-time tracking.",
    tech:["Next.js","MongoDB","Stripe","Tailwind CSS","Node.js"],
    color:"#f59e0b",
    challenges:["Multi-currency & shipping calculator","Real-time order tracking","Bulk import management"],
    features:["Product sourcing tool","Order tracking","Bulk purchase discounts","Live chat support"],
    future:["Warehouse integration","AI price prediction","Mobile app"],
    live:"#", github:"#",
    emoji:"🛒"
  }
];

function useTyping(words: string[], speed=90, pause=2000) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const w = words[wordIdx];
    const delay = deleting ? speed/2 : (charIdx === w.length ? pause : speed);
    const t = setTimeout(() => {
      if (!deleting && charIdx < w.length) {
        setText(w.slice(0, charIdx+1)); setCharIdx(c=>c+1);
      } else if (!deleting && charIdx === w.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setText(w.slice(0, charIdx-1)); setCharIdx(c=>c-1);
      } else {
        setDeleting(false); setWordIdx(i=>(i+1)%words.length);
      }
    }, delay);
    return ()=>clearTimeout(t);
  }, [text, charIdx, deleting, wordIdx, words, speed, pause]);
  return text;
}

function SkillBar({name, level, color}: {
  name: string;
  level: number;
  color: string;
}) {
  const [w, setW] = useState(0);
 const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setW(level); },{threshold:0.3});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[level]);

  return (
    <div ref={ref} style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontSize:13,fontWeight:500,color:"var(--text)"}}>{name}</span>
        <span style={{fontSize:12,color:"var(--muted)",fontWeight:500}}>{level}%</span>
      </div>
      <div style={{height:6,background:"var(--track)",borderRadius:99,overflow:"hidden"}}>
        <div style={{
          height:"100%",width:`${w}%`,borderRadius:99,
          background:`linear-gradient(90deg,${color},${color}cc)`,
          transition:"width 1.2s cubic-bezier(.4,0,.2,1)"
        }}/>
      </div>
    </div>
  );
}





// function ProjectModal({project, onClose}) {
  
//   useEffect(()=>{
//     const h = e=>{ if(e.key==="Escape") onClose(); };
//     window.addEventListener("keydown",h);
//     return ()=>window.removeEventListener("keydown",h);
//   },[onClose]);
//   return (
//     <div onClick={onClose} style={{
//       position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(6px)",
//       zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20
//     }}>
//       <div onClick={e=>e.stopPropagation()} style={{
//         background:"var(--card)",border:"1px solid var(--border)",borderRadius:20,
//         maxWidth:640,width:"100%",maxHeight:"85vh",overflowY:"auto",padding:32
//       }}>
//         <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
//           <div>
//             <div style={{fontSize:40,marginBottom:8}}>{project.emoji}</div>
//             <h2 style={{fontSize:26,fontWeight:700,color:"var(--text)",margin:0}}>{project.name}</h2>
//             <p style={{color:project.color,fontWeight:600,margin:"4px 0 0"}}>{project.tagline}</p>
//           </div>
//           <button onClick={onClose} style={{
//             background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:10,
//             width:36,height:36,cursor:"pointer",fontSize:18,color:"var(--muted)",
//             display:"flex",alignItems:"center",justifyContent:"center"
//           }}>✕</button>
//         </div>
//         <p style={{color:"var(--muted)",lineHeight:1.7,marginBottom:24}}>{project.desc}</p>
//         <div style={{marginBottom:20}}>
//           <h3 style={{fontSize:14,fontWeight:700,color:"var(--text)",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Tech Stack</h3>
//           <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
//             {project.tech.map(t=>(
//               <span key={t} style={{
//                 padding:"4px 12px",borderRadius:99,fontSize:12,fontWeight:600,
//                 background:`${project.color}20`,color:project.color,border:`1px solid ${project.color}40`
//               }}>{t}</span>
//             ))}
//           </div>
//         </div>
//         <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
//           {[
//             {label:"✦ Features",items:project.features,color:"#10b981"},
//             {label:"⚠ Challenges",items:project.challenges,color:"#f59e0b"},
//             {label:"🚀 Future Plans",items:project.future,color:"#8b5cf6"},
//           ].map(s=>(
//             <div key={s.label} style={{background:"var(--bg2)",borderRadius:12,padding:16}}>
//               <p style={{fontWeight:700,fontSize:12,color:s.color,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>{s.label}</p>
//               {s.items.map(i=>(
//                 <div key={i} style={{fontSize:13,color:"var(--muted)",paddingLeft:8,borderLeft:`2px solid ${s.color}40`,marginBottom:6}}>{i}</div>
//               ))}
//             </div>
//           ))}
//         </div>
//         <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
//           <a href={project.live} style={{
//             flex:1,padding:"12px 20px",borderRadius:12,background:project.color,
//             color:"#fff",fontWeight:700,fontSize:14,textDecoration:"none",textAlign:"center",
//             border:`2px solid ${project.color}`
//           }}>🌐 Live Demo</a>
//           <a href={project.github} style={{
//             flex:1,padding:"12px 20px",borderRadius:12,background:"transparent",
//             color:"var(--text)",fontWeight:700,fontSize:14,textDecoration:"none",textAlign:"center",
//             border:"2px solid var(--border)"
//           }}>⌥ GitHub Repo</a>
//         </div>
//       </div>
//     </div>
//   );
// }






// ১. প্রজেক্ট অবজেক্টের টাইপগুলো এখানে ডিফাইন করা হলো
interface ProjectType {
  emoji: string;
  name: string;
  tagline: string;
  color: string;
  desc: string;
  tech: string[];
  features?: string[];
  challenges?: string[];
  future?: string[];
  live: string;
  github: string;
}

// ২. মেইন মোডাল ফাংশন টাইপসহ
export  function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectType | null; // প্রজেক্ট অবজেক্ট অথবা নাল হতে পারে
  onClose: () => void;         // ওনক্লোজ একটি ফাংশন
}) {
  
  useEffect(() => {
    // এখানে e: KeyboardEvent টাইপ দেওয়া হয়েছে
    const h = (e: KeyboardEvent) => { 
      if (e.key === "Escape") onClose(); 
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // প্রজেক্ট যদি না থাকে তাহলে মোডাল রেন্ডার হবে না
  if (!project) return null;

  return (
  <div onClick={onClose} style={{
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
  zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20
}}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20,
        maxWidth: 640, width: "100%", maxHeight: "85vh", overflowY: "auto", padding: 32
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{project.emoji}</div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "var(--text)", margin: 0 }}>{project.name}</h2>
            <p style={{ color: project.color, fontWeight: 600, margin: "4px 0 0" }}>{project.tagline}</p>
          </div>
          <button onClick={onClose} style={{
            background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 10,
            width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "var(--muted)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>✕</button>
        </div>
        <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 24 }}>{project.desc}</p>
        
        {/* Tech Stack */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Tech Stack</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tech?.map(t => (
              <span key={t} style={{
                padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40`
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Features, Challenges & Future Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {[
            { label: "✦ Features", items: project.features, color: "#10b981" },
            { label: "⚠ Challenges", items: project.challenges, color: "#f59e0b" },
            { label: "🚀 Future Plans", items: project.future, color: "#8b5cf6" },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--bg2)", borderRadius: 12, padding: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 12, color: s.color, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</p>
              {s.items?.map(i => (
                <div key={i} style={{ fontSize: 13, color: "var(--muted)", paddingLeft: 8, borderLeft: `2px solid ${s.color}40`, marginBottom: 6 }}>{i}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href={project.live} target="_blank" rel="noreferrer" style={{
            flex: 1, padding: "12px 20px", borderRadius: 12, background: project.color,
            color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center",
            border: `2px solid ${project.color}`
          }}>🌐 Live Demo</a>
          <a href={project.github} target="_blank" rel="noreferrer" style={{
            flex: 1, padding: "12px 20px", borderRadius: 12, background: "transparent",
            color: "var(--text)", fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center",
            border: "2px solid var(--border)"
          }}>⌥ GitHub Repo</a>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
 const [activeProject, setActiveProject] = useState<ProjectType | null>(null);
  const [activeSkillTab, setActiveSkillTab] = useState("Frontend");
  
  const [sent, setSent] = useState(false);
  const typing = useTyping(["Full Stack Developer","WordPress Developer","Graphic Designer","UI/UX Enthusiast"]);

  const theme = dark ? {
    bg:"#0a0a0f",bg2:"#13131a",card:"#1a1a24",border:"#ffffff12",
    text:"#f0f0f8",muted:"#8888aa",accent:"#6366f1",accent2:"#818cf8",track:"#ffffff10"
  } : {
    bg:"#f8f8fc",bg2:"#eeeef8",card:"#ffffff",border:"#e2e2f0",
    text:"#1a1a2e",muted:"#6b6b8a",accent:"#4f46e5",accent2:"#6366f1",track:"#e2e2f0"
  };

  useEffect(()=>{
    const root = document.documentElement;
    Object.entries(theme).forEach(([k,v])=>root.style.setProperty(`--${k}`,v));
  },[theme]);

  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) setActiveSection(e.target.id); });
    },{threshold:0.4});
    NAV_LINKS.forEach(l=>{ const el=document.getElementById(l.toLowerCase()); if(el) obs.observe(el); });
    return ()=>obs.disconnect();
  },[]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    setMenuOpen(false);
  };

  const accentRgb = dark ? "99,102,241" : "79,70,229";
  const skillColors = {Frontend:"#6366f1",Backend:"#10b981",WordPress:"#f59e0b",Tools:"#ef4444"};

  return (
    <div style={{background:"var(--bg)",color:"var(--text)",fontFamily:"'DM Sans',system-ui,sans-serif",minHeight:"100vh",transition:"all .3s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        :root{--bg:#0a0a0f;--bg2:#13131a;--card:#1a1a24;--border:#ffffff12;--text:#f0f0f8;--muted:#8888aa;--accent:#6366f1;--accent2:#818cf8;--track:#ffffff10;}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-track{background:var(--bg2);}
        ::-webkit-scrollbar-thumb{background:var(--accent);border-radius:99px;}
        section{padding:100px 0 60px;}
        .container{max-width:1140px;margin:0 auto;padding:0 24px;}
        .section-title{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,42px);font-weight:700;color:var(--text);margin-bottom:12px;}
        .section-sub{color:var(--muted);font-size:16px;margin-bottom:56px;max-width:520px;}
        .gradient-text{background:linear-gradient(135deg,var(--accent) 0%,#a78bfa 50%,#38bdf8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:12px;font-weight:600;font-size:14px;cursor:pointer;transition:all .25s;text-decoration:none;border:none;font-family:inherit;}
        .btn-primary{background:var(--accent);color:#fff;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(${accentRgb},.4);}
        .btn-outline{background:transparent;color:var(--text);border:2px solid var(--border);}
        .btn-outline:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-2px);}
        .card{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:28px;transition:all .3s;}
        .card:hover{border-color:var(--accent)40;transform:translateY(-4px);box-shadow:0 20px 40px rgba(${accentRgb},.12);}
        .skill-tab{padding:8px 20px;border-radius:99px;font-size:13px;font-weight:600;cursor:pointer;transition:all .25s;border:1.5px solid transparent;}
        input,textarea{width:100%;background:var(--bg2);border:1.5px solid var(--border);border-radius:12px;padding:14px 18px;color:var(--text);font-family:inherit;font-size:14px;outline:none;transition:border-color .25s;resize:vertical;}
        input:focus,textarea:focus{border-color:var(--accent);}
        @media(max-width:768px){.hero-grid{flex-direction:column-reverse!important;text-align:center;}.hero-actions{justify-content:center!important;flex-wrap:wrap;}.social-row{justify-content:center!important;}.about-grid{flex-direction:column!important;}.projects-grid{grid-template-columns:1fr!important;}}
      `}</style>

      {/* Navbar */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:900,
        background:dark?"rgba(10,10,15,.85)":"rgba(248,248,252,.92)",
        backdropFilter:"blur(20px)",borderBottom:"1px solid var(--border)"
      }}>
        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:72}}>
          <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>scrollTo("home")}>
            <img src={LOGO_IMG} alt="Debraz Pul Logo" style={{width:44,height:44,objectFit:"contain",borderRadius:8,background:"transparent"}}/>
            <div>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,lineHeight:1.1}}>
                <span className="gradient-text">Debraz Pul</span>
              </div>
              <div style={{fontSize:10,color:"var(--muted)",fontWeight:500,letterSpacing:1,textTransform:"uppercase"}}>Portfolio</div>
            </div>
          </div>
          <div style={{display:"flex",gap:4,alignItems:"center"}} className="desktop-nav">
            {NAV_LINKS.map(l=>(
              <button key={l} onClick={()=>scrollTo(l.toLowerCase())} style={{
                background:"none",border:"none",cursor:"pointer",padding:"6px 14px",borderRadius:8,
                fontSize:14,fontWeight:activeSection===l.toLowerCase()?"600":"400",
                color:activeSection===l.toLowerCase()?"var(--accent)":"var(--muted)",
                transition:"all .2s"
              }}>{l}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <button onClick={()=>setDark(d=>!d)} style={{
              background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:10,
              width:40,height:40,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"
            }}>{dark?"☀️":"🌙"}</button>
            <button onClick={()=>setMenuOpen(m=>!m)} style={{
              display:"none",background:"var(--bg2)",border:"1px solid var(--border)",
              borderRadius:10,width:40,height:40,cursor:"pointer",fontSize:18,
              alignItems:"center",justifyContent:"center"
            }} className="hamburger">☰</button>
          </div>
        </div>
        {menuOpen && (
          <div style={{
            background:"var(--card)",borderTop:"1px solid var(--border)",padding:16
          }}>
            {NAV_LINKS.map(l=>(
              <div key={l} onClick={()=>scrollTo(l.toLowerCase())} style={{
                padding:"12px 16px",cursor:"pointer",borderRadius:10,
                color:activeSection===l.toLowerCase()?"var(--accent)":"var(--text)",
                fontWeight:activeSection===l.toLowerCase()?"600":"400"
              }}>{l}</div>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:72,background:`radial-gradient(ellipse 60% 50% at 70% 40%, rgba(${accentRgb},.07) 0%, transparent 70%)`}}>
        <div className="container">
          <div className="hero-grid" style={{display:"flex",alignItems:"center",gap:64,justifyContent:"space-between"}}>
            <div style={{flex:"1 1 520px"}}>
              <div style={{
                display:"inline-flex",alignItems:"center",gap:8,
                background:`rgba(${accentRgb},.1)`,border:`1px solid rgba(${accentRgb},.25)`,
                borderRadius:99,padding:"6px 16px",fontSize:13,color:"var(--accent)",fontWeight:600,
                marginBottom:28
              }}>
                <span style={{width:7,height:7,borderRadius:"50%",background:"var(--accent)",display:"inline-block",animation:"pulse 2s infinite"}}/>
                Available for hire
              </div>
              <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(36px,5vw,66px)",fontWeight:800,lineHeight:1.1,marginBottom:16}}>
                Hi, I'm <span className="gradient-text">Debraz Pul</span>
              </h1>
              <div style={{fontSize:"clamp(18px,2.5vw,26px)",fontWeight:500,marginBottom:20,height:38,color:"var(--accent2)"}}>
                {typing}<span style={{animation:"blink 1s infinite",borderRight:"2px solid var(--accent)"}}>  </span>
              </div>
              <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:16,marginBottom:36,maxWidth:500}}>
                Building modern web experiences with creativity and technology. Passionate about clean code, beautiful interfaces, and impactful digital solutions.
              </p>
              <div className="hero-actions" style={{display:"flex",gap:12,marginBottom:40,flexWrap:"wrap"}}>
                <button className="btn btn-primary" onClick={()=>scrollTo("contact")}>💬 Hire Me</button>
                <button className="btn btn-outline" onClick={()=>scrollTo("contact")}>📬 Contact Me</button>
                <button className="btn btn-outline">📄 Download CV</button>
              </div>
              <div className="social-row" style={{display:"flex",gap:12}}>
                {[
                  {icon:"🐙",label:"GitHub",href:"#"},
                  {icon:"💼",label:"LinkedIn",href:"#"},
                  {icon:"🐦",label:"Twitter",href:"#"},
                  {icon:"📘",label:"Facebook",href:"#"},
                  {icon:"✉️",label:"Email",href:"mailto:debraz@example.com"},
                ].map(s=>(
                  <a key={s.label} href={s.href} title={s.label} target="_blank" rel="noreferrer" style={{
                    width:44,height:44,borderRadius:12,background:"var(--bg2)",border:"1px solid var(--border)",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,
                    textDecoration:"none",transition:"all .25s"
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.background=`rgba(${accentRgb},.15)`;e.currentTarget.style.borderColor=`rgba(${accentRgb},.5)`;}}
                    onMouseLeave={e=>{e.currentTarget.style.background="var(--bg2)";e.currentTarget.style.borderColor="var(--border)";}}
                  >{s.icon}</a>
                ))}
              </div>
            </div>
            <div style={{flex:"0 0 360px",display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div style={{position:"relative"}}>
                <div style={{
                  width:300,height:300,borderRadius:"40% 60% 55% 45% / 50% 40% 60% 50%",
                  background:`linear-gradient(135deg,rgba(${accentRgb},.25),rgba(168,139,250,.15))`,
                  position:"absolute",inset:-16,animation:"morph 8s ease-in-out infinite"
                }}/>
                <div style={{
                  width:300,height:300,borderRadius:"50% 40% 60% 40% / 45% 55% 45% 55%",
                  overflow:"hidden",border:`3px solid rgba(${accentRgb},.4)`,position:"relative"
                }}>
                  <img src={PROFILE_IMG} alt="Debraz Pul" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
                </div>
                {[
                  {icon:"⚛️",label:"React",top:-20,right:-20},
                  {icon:"🟢",label:"Node.js",bottom:40,right:-30},
                  {icon:"🎨",label:"Design",top:60,left:-30},
                ].map(b=>(
                  <div key={b.label} style={{
                    position:"absolute",top:b.top,right:b.right,bottom:b.bottom,left:b.left,
                    background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,
                    padding:"8px 14px",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",
                    gap:6,whiteSpace:"nowrap",boxShadow:`0 8px 24px rgba(${accentRgb},.15)`
                  }}>
                    {b.icon} {b.label}
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:24,marginTop:36}}>
                {[["100+","Students"],["50+","Projects"],["3+","Years"]].map(([n,l])=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:800,color:"var(--accent)"}}>{n}</div>
                    <div style={{fontSize:12,color:"var(--muted)"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes morph{0%,100%{border-radius:40% 60% 55% 45% / 50% 40% 60% 50%}33%{border-radius:60% 40% 45% 55% / 60% 50% 40% 45%}66%{border-radius:45% 55% 60% 40% / 40% 60% 45% 55%}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}`}</style>
      </section>

      {/* About */}
      <section id="about" style={{background:`linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%)`}}>
        <div className="container">
          <p style={{color:"var(--accent)",fontWeight:600,fontSize:14,textTransform:"uppercase",letterSpacing:3,marginBottom:12}}>Get to know me</p>
          <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
          <p className="section-sub">A passionate developer, designer, and educator shaping digital futures.</p>
          <div className="about-grid" style={{display:"flex",gap:48,alignItems:"flex-start"}}>
            <div style={{flex:"0 0 320px"}}>
              <div style={{position:"relative",width:320,height:360}}>
                <div style={{
                  position:"absolute",inset:0,borderRadius:24,
                  background:`linear-gradient(135deg,rgba(${accentRgb},.2),transparent)`,
                  border:`1px solid rgba(${accentRgb},.2)`
                }}/>
                <img src={PROFILE_IMG} alt="Debraz Pul" style={{
                  width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",
                  borderRadius:24,position:"relative"
                }}/>
                <div style={{
                  position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",
                  background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,
                  padding:"10px 20px",display:"flex",gap:16,backdropFilter:"blur(10px)",
                  whiteSpace:"nowrap"
                }}>
                  {[["100+","Students 🎓"],["50+","Projects 💻"],["3+","Years 🏆"]].map(([n,l])=>(
                    <div key={l} style={{textAlign:"center"}}>
                      <div style={{fontWeight:800,fontSize:18,color:"var(--accent)"}}>{n}</div>
                      <div style={{fontSize:10,color:"var(--muted)"}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{flex:1}}>
              <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:700,marginBottom:16}}>
                Full Stack Developer & Creative Designer
              </h3>
              <p style={{color:"var(--muted)",lineHeight:1.9,marginBottom:20}}>
                I am <strong style={{color:"var(--text)"}}>Debraz Pul</strong>, a passionate Full Stack Developer and Graphic Designer with experience in building modern web applications. My journey started with curiosity about how websites work and evolved into a deep love for crafting digital experiences.
              </p>
              <p style={{color:"var(--muted)",lineHeight:1.9,marginBottom:28}}>
                From WordPress development to teaching graphic design to 100+ students through government initiatives — I bring both technical depth and creative vision to every project I undertake. I enjoy working on SaaS products, freelance web solutions, and mentoring the next generation of developers.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {[
                  {icon:"💻",label:"Full Stack Dev"},
                  {icon:"🎨",label:"UI/UX Design"},
                  {icon:"📦",label:"WordPress Dev"},
                  {icon:"🚀",label:"SaaS Builder"},
                  {icon:"🎓",label:"Tech Educator"},
                  {icon:"📚",label:"Startup Reader"},
                ].map(item=>(
                  <div key={item.label} style={{
                    display:"flex",alignItems:"center",gap:12,
                    background:"var(--card)",border:"1px solid var(--border)",
                    borderRadius:12,padding:"12px 16px",fontSize:14,fontWeight:500
                  }}>
                    <span style={{fontSize:20}}>{item.icon}</span>{item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills">
        <div className="container">
          <p style={{color:"var(--accent)",fontWeight:600,fontSize:14,textTransform:"uppercase",letterSpacing:3,marginBottom:12}}>What I know</p>
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
          <p className="section-sub">A diverse toolkit built over years of hands-on development and design work.</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:40}}>
            {Object.keys(SKILLS).map(tab=>(
              <button key={tab} className="skill-tab" onClick={()=>setActiveSkillTab(tab)} style={{
                background:activeSkillTab===tab?`rgba(${accentRgb},.12)`:"transparent",
                borderColor:activeSkillTab===tab?"var(--accent)":"var(--border)",
                color:activeSkillTab===tab?"var(--accent)":"var(--muted)"
              }}>{tab}</button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24}}>
            {SKILLS[activeSkillTab as keyof typeof SKILLS]?.map(s=>(
              <div key={s.name} className="card">
                <SkillBar name={s.name} level={s.level} color={skillColors[activeSkillTab as keyof typeof SKILLS]}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" style={{background:"var(--bg2)"}}>
        <div className="container">
          <p style={{color:"var(--accent)",fontWeight:600,fontSize:14,textTransform:"uppercase",letterSpacing:3,marginBottom:12}}>Academic background</p>
          <h2 className="section-title">My <span className="gradient-text">Education</span></h2>
          <p className="section-sub">The academic foundation that shaped my technical and analytical thinking.</p>
          <div style={{position:"relative",paddingLeft:40}}>
            <div style={{position:"absolute",left:14,top:0,bottom:0,width:2,background:`linear-gradient(180deg,var(--accent),transparent)`}}/>
            {EDUCATION.map((e,i)=>(
              <div key={i} style={{position:"relative",marginBottom:36}}>
                <div style={{
                  position:"absolute",left:-33,top:4,width:20,height:20,borderRadius:"50%",
                  background:dark?"var(--bg)":"var(--bg2)",border:`3px solid var(--accent)`,
                  display:"flex",alignItems:"center",justifyContent:"center"
                }}/>
                <div className="card" style={{marginLeft:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:8}}>
                    <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:700}}>{e.degree}</h3>
                    <span style={{
                      background:`rgba(${accentRgb},.12)`,color:"var(--accent)",
                      padding:"3px 12px",borderRadius:99,fontSize:12,fontWeight:600,whiteSpace:"nowrap"
                    }}>{e.year}</span>
                  </div>
                  <p style={{color:"var(--accent2)",fontWeight:600,fontSize:14,marginBottom:8}}>🏛 {e.institution}</p>
                  <p style={{color:"var(--muted)",fontSize:14,lineHeight:1.7}}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience">
        <div className="container">
          <p style={{color:"var(--accent)",fontWeight:600,fontSize:14,textTransform:"uppercase",letterSpacing:3,marginBottom:12}}>Career journey</p>
          <h2 className="section-title">My <span className="gradient-text">Experience</span></h2>
          <p className="section-sub">Professional roles that have defined and refined my capabilities.</p>
          <div style={{display:"grid",gap:24}}>
            {EXPERIENCE.map((e,i)=>(
              <div key={i} className="card" style={{display:"flex",gap:24,flexWrap:"wrap"}}>
                <div style={{
                  flex:"0 0 48px",width:48,height:48,borderRadius:14,
                  background:`rgba(${accentRgb},.12)`,display:"flex",alignItems:"center",
                  justifyContent:"center",fontSize:22
                }}>{i===0?"💻":"🎨"}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:4}}>
                    <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:19,fontWeight:700}}>{e.role}</h3>
                    <span style={{
                      background:`rgba(${accentRgb},.1)`,color:"var(--accent)",
                      padding:"3px 12px",borderRadius:99,fontSize:12,fontWeight:600
                    }}>{e.period}</span>
                  </div>
                  <p style={{color:"var(--accent2)",fontWeight:600,fontSize:14,marginBottom:14}}>@ {e.company}</p>
                  <ul style={{paddingLeft:0,listStyle:"none",display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    {e.duties.map(d=>(
                      <li key={d} style={{
                        display:"flex",alignItems:"flex-start",gap:8,
                        color:"var(--muted)",fontSize:14,lineHeight:1.6
                      }}>
                        <span style={{color:"var(--accent)",marginTop:2,flexShrink:0}}>▸</span>{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{background:"var(--bg2)"}}>
        <div className="container">
          <p style={{color:"var(--accent)",fontWeight:600,fontSize:14,textTransform:"uppercase",letterSpacing:3,marginBottom:12}}>What I've built</p>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-sub">A selection of real-world applications built with modern technologies.</p>
          <div className="projects-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:24}}>
            {PROJECTS.map(p=>(
              <div key={p.id} className="card" style={{display:"flex",flexDirection:"column"}}>
                <div style={{
                  height:180,borderRadius:14,marginBottom:20,overflow:"hidden",
                  background:`linear-gradient(135deg,${p.color}22,${p.color}08)`,
                  border:`1px solid ${p.color}30`,display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:72
                }}>{p.emoji}</div>
                <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700,marginBottom:6}}>{p.name}</h3>
                <p style={{color:p.color,fontWeight:600,fontSize:13,marginBottom:10}}>{p.tagline}</p>
                <p style={{color:"var(--muted)",fontSize:14,lineHeight:1.7,marginBottom:16,flex:1}}>{p.desc}</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
                  {p.tech.slice(0,4).map(t=>(
                    <span key={t} style={{
                      padding:"3px 10px",borderRadius:99,fontSize:11,fontWeight:600,
                      background:`${p.color}18`,color:p.color,border:`1px solid ${p.color}30`
                    }}>{t}</span>
                  ))}
                </div>
                <button onClick={()=>setActiveProject(p)} style={{
                  width:"100%",padding:"12px",borderRadius:12,border:`2px solid ${p.color}`,
                  background:"transparent",color:p.color,fontWeight:700,fontSize:14,
                  cursor:"pointer",transition:"all .25s",fontFamily:"inherit"
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background=p.color;e.currentTarget.style.color="#fff";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=p.color;}}
                >View Details →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="container">
          <p style={{color:"var(--accent)",fontWeight:600,fontSize:14,textTransform:"uppercase",letterSpacing:3,marginBottom:12}}>Get in touch</p>
          <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
          <p className="section-sub">Have a project in mind? Let's build something great together.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:40,flexWrap:"wrap"}} className="contact-grid">
            <div>
              <p style={{color:"var(--muted)",lineHeight:1.9,marginBottom:32}}>
                I'm currently available for freelance work and full-time positions. Whether you have a question or just want to say hi, my inbox is always open!
              </p>
              {[
                {icon:"✉️",label:"Email",value:"designerdebraz@gmail.com",href:"mailto:designerdebraz@gmail.com"},
                {icon:"📱",label:"Phone",value:"+8801767102639",href:"tel:+8801767102639"},
                {icon:"💬",label:"WhatsApp",value:"+8801767102639",href:"https://wa.me/8801767102639"},
                {icon:"📍",label:"Location",value:"Bangladesh",href:"#"},
              ].map(c=>(
                <a key={c.label} href={c.href} style={{
                  display:"flex",alignItems:"center",gap:16,padding:16,
                  background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,
                  marginBottom:12,textDecoration:"none",transition:"all .25s"
                }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=`rgba(${accentRgb},.5)`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";}}
                >
                  <div style={{
                    width:44,height:44,borderRadius:12,background:`rgba(${accentRgb},.1)`,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:20
                  }}>{c.icon}</div>
                  <div>
                    <div style={{fontSize:12,color:"var(--muted)"}}>{c.label}</div>
                    <div style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="card">
              {sent ? (
                <div style={{textAlign:"center",padding:40}}>
                  <div style={{fontSize:56,marginBottom:16}}>🎉</div>
                  <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700,marginBottom:8}}>Message Sent!</h3>
                  <p style={{color:"var(--muted)"}}>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <div>
                  <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700,marginBottom:24}}>Send a Message</h3>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                    <input placeholder="Full Name" required/>
                    <input type="email" placeholder="Email Address" required/>
                  </div>
                  <input placeholder="Subject" style={{marginBottom:16}} required/>
                  <textarea rows={5} placeholder="Your message..." style={{marginBottom:20}} required/>
                  <button onClick={()=>setSent(true)} className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:16}}>
                    Send Message 🚀
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background:dark?"#06060a":"#f0f0f8",borderTop:"1px solid var(--border)",padding:"48px 0 24px"}}>
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:32,marginBottom:40,flexWrap:"wrap"}}>
            <div>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:24,marginBottom:12}}>
                <span className="gradient-text">Debraz Pul</span>
              </div>
              <p style={{color:"var(--muted)",fontSize:14,lineHeight:1.8,maxWidth:280,marginBottom:20}}>
                Building modern web experiences with creativity and technology. Available for freelance and full-time roles.
              </p>
              <div style={{display:"flex",gap:10}}>
                {["🐙","💼","🐦","📘","✉️"].map((icon,i)=>(
                  <a key={i} href="#" style={{
                    width:38,height:38,background:"var(--bg2)",border:"1px solid var(--border)",
                    borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",
                    textDecoration:"none",fontSize:16,transition:"all .2s"
                  }}>{icon}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{fontWeight:700,fontSize:14,textTransform:"uppercase",letterSpacing:2,marginBottom:16,color:"var(--accent)"}}>Navigation</h4>
              {NAV_LINKS.map(l=>(
                <div key={l} onClick={()=>scrollTo(l.toLowerCase())} style={{
                  color:"var(--muted)",fontSize:14,marginBottom:10,cursor:"pointer",transition:"color .2s"
                }}
                  onMouseEnter={e=>e.currentTarget.style.color="var(--accent)"}
                  onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}
                >{l}</div>
              ))}
            </div>
            <div>
              <h4 style={{fontWeight:700,fontSize:14,textTransform:"uppercase",letterSpacing:2,marginBottom:16,color:"var(--accent)"}}>Services</h4>
              {["Web Development","WordPress Dev","UI/UX Design","Graphic Design","Tech Training"].map(s=>(
                <div key={s} style={{color:"var(--muted)",fontSize:14,marginBottom:10}}>{s}</div>
              ))}
            </div>
          </div>
          <div style={{borderTop:"1px solid var(--border)",paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <p style={{color:"var(--muted)",fontSize:14}}>© 2025 Debraz Pul. All Rights Reserved.</p>
            <p style={{color:"var(--muted)",fontSize:13}}>Built with React & ❤️</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{
        position:"fixed",bottom:28,right:28,width:48,height:48,borderRadius:14,
        background:"var(--accent)",border:"none",color:"#fff",fontSize:20,
        cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
        boxShadow:`0 8px 24px rgba(${accentRgb},.4)`,zIndex:800,transition:"transform .2s"
      }}
        onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
        onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
      >↑</button>

      {/* Project modal */}
      {activeProject && <ProjectModal project={activeProject} onClose={()=>setActiveProject(null)}/>}

      <style>{`
        @media(max-width:900px){
          .contact-grid{grid-template-columns:1fr!important;}
          footer .container > div:first-child{grid-template-columns:1fr 1fr!important;}
        }
        @media(max-width:600px){
          footer .container > div:first-child{grid-template-columns:1fr!important;}
          .desktop-nav{display:none!important;}
          .hamburger{display:flex!important;}
        }
      `}</style>
    </div>
  );
}
