import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { useVideos } from "../hooks/useVideos";

const longVideos = [
  {
    url: "https://youtu.be/eLgQUkM5gHk?si=xdFrf0DSFl3vLtdE",
    thumbnail: "https://img.youtube.com/vi/eLgQUkM5gHk/maxresdefault.jpg",
  },
  {
    url: "https://youtu.be/-XLSXdd8ZRA?si=oSPMTRIFZm6Xraxo",
    thumbnail: "https://img.youtube.com/vi/-XLSXdd8ZRA/maxresdefault.jpg",
  },
];

const shorts = [
  {
    url: "https://youtube.com/shorts/_0OlqR8OCBA",
    thumbnail: "https://img.youtube.com/vi/_0OlqR8OCBA/hqdefault.jpg",
  },
  {
    url: "https://youtube.com/shorts/PD9w8o_jIqE",
    thumbnail: "https://img.youtube.com/vi/PD9w8o_jIqE/hqdefault.jpg",
  },
  {
    url: "https://youtube.com/shorts/XhgRDXrpGoE",
    thumbnail: "https://img.youtube.com/vi/XhgRDXrpGoE/hqdefault.jpg",
  },
  {
    url: "https://youtube.com/shorts/-3aKZQvZf_A?si=R4zvS6dpbDiTb466",
    thumbnail: "https://img.youtube.com/vi/-3aKZQvZf_A/hqdefault.jpg",
  },
  
];

const extraServices = [
  {
    heading: "AD Creatives & VSLs",
    subtext:
      "Strategic ad creatives and VSLs engineered to capture attention, build instant trust, and guide viewers seamlessly from curiosity to conversion.",
  },
  {
    heading: "Explainers",
    subtext:
      "High-converting ad creatives and VSLs designed to simplify complex SaaS products, capture attention instantly, and turn viewers into paying customers.",
  },
  {
    heading: "LinkedIn",
    subtext:
      "We interview you once and transform it into 12 strategic LinkedIn videos designed to build trust, establish authority, and generate consistent inbound leads from your ideal clients.",
  },
  {
    heading: "Podcasts",
    subtext:
      "Professional podcast editing focused on clarity, storytelling flow, and audience retention helping your content sound as good as your ideas deserve.",
  },
];

const Serviceheading = () => (
  <div id="services" className="mb-12 flex flex-col items-center justify-center text-center">
    <span className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold tracking-[0.25em] text-white/100">
      Our Services
    </span>
    
    <h2 className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl">
      How we can help{" "}
      <span className="italic font-serif font-bold text-sprout">you?</span>
    </h2>
    <p className="mx-auto mt-3 max-w-md text-medium text-white/70">
      Authority building YouTube content engineered to expand your reach, deepen audience 
trust, and create consistent inbound opportunities.
    </p>
  </div>
);

const VideoCard = ({ video, aspect }) => (
  <div
  style={{
    ...styles.videoWrap,
    aspectRatio: aspect,
    width: "100%",
  }}
>
    <a href={video.url} target="_blank" rel="noopener noreferrer" style={styles.videoLink}>
      <img src={video.thumbnail} alt="YouTube video thumbnail" style={styles.thumbnail} />
      <div style={styles.playBtn}>
        <FontAwesomeIcon
          icon={faYoutube}
          style={{ color: "rgb(255, 0, 0)", width: "100%", height: "100%" }}
        />
      </div>
    </a>
  </div>
);

const MediaCard = ({ heading, subtext, children, gridStyle }) => (
  <div style={styles.card}>
    <div style={styles.cornerGlow} />
    <h2 style={styles.heading}>{heading}</h2>
    <p style={styles.subtext}>{subtext}</p>
    <div style={gridStyle}>{children}</div>
  </div>
);

const ServiceCard = ({ heading, subtext }) => (
  <div style={styles.serviceSmallCard}>
    <div style={styles.cornerGlowBlue} />
    <h2 style={styles.heading}>{heading}</h2>
    <p style={styles.subtext}>{subtext}</p>
    <div style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 2 }}>
      <a
        href="https://calendly.com/growganicmediallc/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#765eff] px-6 py-3 font-semibold text-white transition hover:bg-gray-400"
      >
        Explore pricing ⟶
      </a>
    </div>
  </div>
);

const ServiceSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Real videos added via the admin panel.
  // Each falls back to the hardcoded demo set until real ones exist.
  const { videos: youtubeVideos } = useVideos("youtube");
  const realYoutubeVideos = youtubeVideos
    .filter((v) => v.videoUrl && v.thumbnailUrl)
    .map((v) => ({ url: v.videoUrl, thumbnail: v.thumbnailUrl }));
  const longVideosToShow = realYoutubeVideos.length > 0 ? realYoutubeVideos : longVideos;

  const { videos: shortsVideos } = useVideos("shorts");
  const realShorts = shortsVideos
    .filter((v) => v.videoUrl && v.thumbnailUrl)
    .map((v) => ({ url: v.videoUrl, thumbnail: v.thumbnailUrl }));
  const shortsToShow = realShorts.length > 0 ? realShorts : shorts;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Serviceheading />

      {/* Long Videos Card */}
      <MediaCard
        heading="YouTube Videos"
        subtext="YouTube videos that transform your expertise into Authority, Trust, and Qualified 
Inbound Leads."
        gridStyle={styles.videoGrid}
      >
        <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", marginTop: "0px" }}>
          
          <a  href="https://calendly.com/growganicmediallc/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#765eff] px-6 py-3 font-semibold text-white transition hover:bg-gray-400"
          >
            Explore pricing ⟶
          </a>
        </div>
        {longVideosToShow.map((video, i) => (
          <VideoCard key={i} video={video} aspect="16/9" />
        ))}
      </MediaCard>

      <div style={{ height: "28px" }} />

      {/* Shorts Card */}
      <>
        <MediaCard
          heading="Youtube Shorts"
          subtext="Turn your expertise into high-performing short-form content that increases visibility, 
builds authority, and attracts qualified opportunities across every platform."
        gridStyle={{
  ...styles.shortsGrid,
  gridTemplateColumns: isMobile
    ? "repeat(2, minmax(140px, 1fr))"
    : "repeat(3, 260px)",
}}
        >
          <div
            id="shortform"
            style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", marginTop: "12px" }}
          >
            
           <a   href="https://calendly.com/growganicmediallc/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#765eff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-400 sm:px-6 sm:py-3 sm:text-base"
            >
              Explore pricing ⟶
            </a>
          </div>
          {shortsToShow.map((video, i) => (
  <div
    key={i}
    style={
      !isMobile && i === shortsToShow.length - 1 && shortsToShow.length % 3 === 1
        ? { gridColumn: "2" }
        : {}
    }
  >
    <VideoCard video={video} aspect="9/16" />
  </div>
))}

        </MediaCard>
        <div style={{ height: "28px" }} />
      </>

      {/* 2x2 Extra Services Grid */}
     <div
  style={{
    ...styles.newServicesGrid,
    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
  }}
>
        {extraServices.map((service, i) => (
          <ServiceCard key={i} heading={service.heading} subtext={service.subtext} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "100%",
    maxWidth: "910px",
    margin: "0 auto",
    background: "#090909",
    borderRadius: "28px",
    padding: "44px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  },
  cornerGlow: {
    position: "absolute",
    top: "-120px",
    right: "-80px",
    width: "200px",
    height: "200px",
    background: "radial-gradient(circle, #765eff, transparent 100%)",
    filter: "blur(50px)",
    pointerEvents: "none",
    zIndex: 1,
  },
  cornerGlowBlue: {
    position: "absolute",
    top: "-120px",
    left: "-80px",
    width: "200px",
    height: "200px",
    background: "radial-gradient(circle, #145984, transparent 100%)",
    filter: "blur(50px)",
    pointerEvents: "none",
    zIndex: 1,
  },
  heading: {
    color: "#ffffff",
    fontSize: "34px",
    fontWeight: 700,
    letterSpacing: "-0.5px",
    marginBottom: "14px",
    position: "relative",
    zIndex: 2,
  },
  subtext: {
    color: "#828282",
    fontSize: "15px",
    lineHeight: 1.6,
    maxWidth: "460px",
    margin: "0 auto 28px",
    position: "relative",
    zIndex: 2,
  },
  videoGrid: {
    position: "relative",
    zIndex: 2,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  shortsGrid: {
  position: "relative",
  zIndex: 2,
  display: "grid",
  gridTemplateColumns: "repeat(3, 220px)",
  justifyContent: "center",
  gap: "20px",
},
 newServicesGrid: {
    width: "100%",
    maxWidth: "910px",
    margin: "0 auto",
    display: "grid",
    gap: "28px",
  },
  serviceSmallCard: {
    background: "#090909",
    borderRadius: "28px",
    padding: "44px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  },
  videoWrap: {
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    background: "#000",
    boxShadow: "0 12px 40px rgba(0,0,0,0.55)",
  },
  videoLink: {
    display: "block",
    width: "100%",
    height: "100%",
    position: "relative",
    textDecoration: "none",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  playBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "78px",
    height: "55px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform .25s ease",
  },
};

export default ServiceSection;