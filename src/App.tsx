import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Pause, Play } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const smileMessages = [
  "Okay, that's enough seriousness for today 😭❤️",
  'You still have the cutest smile.',
  'This website officially requests one tiny smile.',
  "Fine, I'll stop annoying you now 😂",
  'Just checking... are you smiling yet? 👀',
  'Rashail = important person. Case closed. ❤️',
];

const promises = [
  { title: 'You Matter ❤️', text: 'Your feelings matter to me.' },
  { title: "I'm Listening 🤍", text: "I don't want to argue. I want to understand." },
  { title: 'No Pressure 🌷', text: "You don't have to reply immediately." },
  { title: "I'm Sorry 🫶", text: 'If I hurt you, I genuinely regret it.' },
  { title: 'Take Your Time 🌙', text: 'You can take whatever time you need.' },
  { title: 'Still Here ✨', text: "When you're ready, I'm here to listen." },
];

const responseOptions = [
  {
    id: 'okay',
    label: "I'm Okay 🤍",
    confirmation: "I'm glad. And thank you for giving me a chance to talk. ❤️",
  },
  {
    id: 'upset',
    label: "I'm Still Upset 🌷",
    confirmation: "I understand. You don't have to hide how you feel. Whenever you're ready, I'll listen.",
  },
  {
    id: 'time',
    label: 'I Need Some Time 🌙',
    confirmation: "Take all the time you need. No pressure. I'll respect your space. 🤍",
  },
];

function App() {
  const [opened, setOpened] = useState(false);
  const [smileIndex, setSmileIndex] = useState<number | null>(null);
  const [listening, setListening] = useState(false);
  const [surpriseShown, setSurpriseShown] = useState(false);
  const [chosenResponse, setChosenResponse] = useState<string | null>(null);
  const [noteOpen, setNoteOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [opened]);

  const openLetter = () => {
    setOpened(true);
    window.setTimeout(() => document.getElementById('for-you')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <main className="page-shell">
      <audio
        ref={audioRef}
        src="/memories/khaab.mp3"
        loop
        preload="none"
        onEnded={() => setIsPlaying(false)}
        data-testid="audio-background-music"
      />
      <div className="music-control">
        <span aria-live="polite">{isPlaying ? 'Music is playing' : 'A song, if you like'}</span>
        <button
          className="music-button"
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          data-testid="button-toggle-music"
        >
          {isPlaying ? <><Pause size={13} aria-hidden="true" /> Pause</> : <><Play size={13} aria-hidden="true" /> Play</>}
        </button>
      </div>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">A little note, made just for you</span>
          <h1 id="hero-title">Hey Rashail...</h1>
          <p className="hero-subtitle">I made something for you.</p>
          <p className="hero-note">Not to pressure you. Not to ask you for anything. Just because you matter to me.</p>
          <button
            className="primary-button"
            type="button"
            onClick={openLetter}
            data-testid="button-open-letter"
          >
            Open this ❤️
          </button>
        </div>
        <span className="scroll-cue"><ArrowDown size={13} aria-hidden="true" /> A quiet moment for you</span>
      </section>

      {opened && <>
      <section id="for-you" className="chapter section-one" aria-labelledby="section-one-title">
        <div className="chapter-inner reveal">
          <span className="section-kicker">01 · For you</span>
          <h2 className="chapter-heading" id="section-one-title">For You, Rashail</h2>
          <p className="chapter-intro">
            I’ve noticed that you’ve been a little distant, and our conversations haven’t felt the same lately.
            I wanted to say this gently, without deciding for you what you might be feeling.
          </p>
          <article className="letter-paper" data-testid="content-understanding-note">
            <p>I don't know exactly what's wrong, and I don't want to pretend that I do.</p>
            <p>Maybe I said something, maybe I did something, or maybe you simply need some space.</p>
            <p>Whatever it is, I want you to know that your feelings matter to me.</p>
          </article>
        </div>
      </section>

      <section className="chapter" aria-labelledby="apology-title">
        <div className="chapter-inner reveal">
          <span className="section-kicker">02 · An honest apology</span>
          <h2 className="chapter-heading" id="apology-title">Maffi Nama ❤️</h2>
          <article className="letter-paper" data-testid="content-apology-letter">
            <p>Rashail, agar meri kisi baat, mere attitude, meri kisi harkat, ya mere kisi lafz ne tumhara dil hurt kiya hai, toh I'm genuinely sorry.</p>
            <p>Mujhe shayad har baar realize nahi hota ke meri choti si baat bhi tumhein hurt kar sakti hai. Aur agar main kabhi rude hua, gussa hua, ya tumhein woh importance nahi de paya jo tum deserve karti ho, then I'm sorry.</p>
            <p>Main yeh nahi keh raha ke tum foran sab bhool jao ya mujhse normally baat karna shuru kar do. Bas itna chahta hoon ke tumhein pata ho ke I genuinely care about you.</p>
            <p>Agar tum upset ho, you have every right to be. Agar tumhein thora time chahiye, I'll respect that too.</p>
            <p>Bas jab tum ready ho, mujhe bata dena ke kya hua. Main sununga — defend nahi karunga.</p>
            <p>Aur Rashail... dil se sorry. ❤️</p>
            <p className="letter-signoff">Mujhe maaf kar dena... jab tumhara dil kare.</p>
          </article>
        </div>
      </section>

      <section className="apology-photo-section" aria-labelledby="apology-photo-title">
        <div className="apology-photo-layout reveal">
          <div className="apology-photo-copy">
            <span className="section-kicker">A personal apology</span>
            <h2 className="chapter-heading" id="apology-photo-title">I'm asking forgiveness, without rushing you.</h2>
            <p>I can't undo what may have hurt you. I can only be honest that I'm sorry, and leave you all the time and space you need.</p>
          </div>
          <figure className="apology-photo-card">
            <img
              src="/memories/forgiveness.png"
              alt="A personal photo of someone holding their hands together in apology."
              data-testid="img-forgiveness"
            />
            <figcaption>A sincere apology, from me to you.</figcaption>
          </figure>
        </div>
      </section>

      <section className="promise-band" aria-labelledby="things-title">
        <div className="promise-inner reveal">
          <span className="section-kicker">03 · I hope you know</span>
          <h2 className="chapter-heading" id="things-title">Things I Want You To Know</h2>
          <div className="promise-grid">
            {promises.map((promise, index) => (
              <article className="promise-card" key={promise.title} data-testid={`card-promise-${index + 1}`}>
                <span className="promise-mark">0{index + 1}</span>
                <h3>{promise.title}</h3>
                <p>{promise.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter smile-section" aria-labelledby="smile-title">
        <div className="smile-panel reveal">
          <span className="section-kicker">04 · A small pause</span>
          <h2 className="chapter-heading" id="smile-title">Okay... one tiny smile please? 🥺</h2>
          <button
            className="quiet-button"
            type="button"
            onClick={() => setSmileIndex(Math.floor(Math.random() * smileMessages.length))}
            data-testid="button-tiny-smile"
          >
            Click me
          </button>
          <p className="smile-message" aria-live="polite" data-testid="text-smile-message">
            {smileIndex === null ? '' : smileMessages[smileIndex]}
          </p>
        </div>
      </section>

      <section className="chapter listening-section" aria-labelledby="listen-title">
        <div className="chapter-inner listening-layout reveal">
          <div className="listen-copy">
            <span className="section-kicker">05 · Whenever you're ready</span>
            <h2 className="chapter-heading" id="listen-title">If You're Angry With Me</h2>
            <p>
              <span>If you're angry with me, I understand.</span>
              <span>You don't have to hide it.</span>
              <span>You don't have to pretend everything is okay.</span>
              <span>Just tell me what hurt you when you're comfortable.</span>
              <span>I'd rather hear the truth and understand you than have you silently carry something that hurt you.</span>
            </p>
            <button className="quiet-button" type="button" onClick={() => setListening(true)} data-testid="button-ill-listen">
              I'll Listen 🤍
            </button>
            {listening && <p className="listen-confirmation" role="status" data-testid="status-listening">No arguments. No excuses. Just listening.</p>}
          </div>
          <div className="talk-illustration" role="img" aria-label="A simple illustration of two people sitting apart, ready to talk">
            <div className="people-shapes"><span className="person" /><span className="talk-line" /><span className="person second" /></div>
            <p className="talk-caption">There is room for your side of the story.</p>
          </div>
        </div>
      </section>

      <section className="cinematic" aria-labelledby="last-thing-title">
        <div className="cinematic-inner">
          <span className="section-kicker">06 · One last thing</span>
          <h2 id="last-thing-title">Rashail...</h2>
          <div className="cinematic-copy" data-testid="content-final-message">
            <p>I don't know what is going through your mind right now.</p>
            <p>I don't know exactly what made you upset.</p>
            <p>But I know that I don't want my ego to be bigger than what you mean to me.</p>
            <p>So I'm choosing to say sorry, to listen, and to give you the space you need.</p>
            <p>Whenever you're ready...</p>
            <p>I'm here. ❤️</p>
          </div>
        </div>
      </section>

      <section className="memories" aria-labelledby="memories-title">
        <div className="memory-intro reveal">
          <span className="section-kicker">A few moments I keep close</span>
          <h2 className="chapter-heading" id="memories-title">Little things, remembered</h2>
          <p className="chapter-intro" style={{ marginInline: 'auto' }}>A few photographs, because some moments feel worth keeping gently.</p>
        </div>
        <div className="memory-grid reveal">
          <figure className="memory-card">
            <img src="/memories/rashail-scarf.png" alt="Rashail in a soft blush scarf" data-testid="img-memory-scarf" />
            <figcaption>A soft kind of day</figcaption>
          </figure>
          <figure className="memory-card">
            <img src="/memories/rashail-portrait.png" alt="A quiet portrait of Rashail" data-testid="img-memory-portrait" />
            <figcaption>That lovely little look</figcaption>
          </figure>
          <figure className="memory-card">
            <img src="/memories/rashail-garden.png" alt="Rashail surrounded by a leafy garden" data-testid="img-memory-garden" />
            <figcaption>Somewhere in the green</figcaption>
          </figure>
        </div>
      </section>

      <section className="final-section" aria-labelledby="final-title">
        <article className="final-card reveal">
          <span className="section-kicker">A small reminder</span>
          <h2 id="final-title">For Rashail, always 🌷</h2>
          <p>No pressure. No expectations. Just a little reminder that you are important to me.</p>
          <button
            className="quiet-button"
            type="button"
            onClick={() => setSurpriseShown((shown) => !shown)}
            aria-expanded={surpriseShown}
            data-testid="button-one-last-surprise"
          >
            One Last Surprise ✨
          </button>
          {surpriseShown && (
            <div className="surprise-message" role="status" data-testid="status-surprise">
              <span className="surprise-heart" aria-hidden="true">♡</span>
              <p>I hope this made you smile, even just a little.</p>
            </div>
          )}
        </article>
      </section>
      <section className="response-section" aria-labelledby="response-title">
        <div className="response-inner reveal">
          <span className="section-kicker">07 · Whenever you're ready</span>
          <h2 className="chapter-heading" id="response-title">You don't have to reply right now...</h2>
          <p className="response-intro">
            But whenever you're ready, I'd really like to know how you're feeling. You can tell me anything — even if you're still upset. I promise I'll listen.
          </p>
          <div className="response-area">
            <div className="choice-row">
              {responseOptions.map((option) => (
                <button
                  key={option.id}
                  className="choice-button"
                  type="button"
                  onClick={() => {
                    setChosenResponse(option.confirmation);
                    setNoteOpen(false);
                  }}
                  data-testid={`button-response-${option.id}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {chosenResponse && (
                <motion.p
                  key={chosenResponse}
                  className="choice-confirmation"
                  role="status"
                  data-testid="status-response-confirmation"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                >
                  {chosenResponse}
                </motion.p>
              )}
            </AnimatePresence>
            <button
              className="note-toggle"
              type="button"
              onClick={() => {
                setNoteOpen((open) => !open);
                setChosenResponse(null);
              }}
              aria-expanded={noteOpen}
              aria-controls="private-note-panel"
              data-testid="button-tell-something"
            >
              I Want To Tell You Something 💌
            </button>
            <AnimatePresence initial={false}>
              {noteOpen && (
                <motion.div
                  id="private-note-panel"
                  className="note-drawer"
                  data-testid="content-private-note"
                  initial={shouldReduceMotion ? false : { opacity: 0, height: 0, y: 8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0, y: 8 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: 'easeOut' }}
                >
                  <label htmlFor="private-note">Your message</label>
                  <textarea id="private-note" placeholder="Write whatever you want me to know..." data-testid="input-private-note" />
                  <span className="note-help">You can copy this message and send it to me whenever you're ready.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <footer className="footer-note" data-testid="text-signoff">With care, and with room for whatever you need.</footer>
      </>}
    </main>
  );
}

export default App;
