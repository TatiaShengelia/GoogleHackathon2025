const eventsData = [
    { 
      id: 1, 
      title: "Astrophysics", 
      imageSrc: require('../images/2.jpg'),
      description: "Astrophysics focuses on celestial bodies and the cosmic phenomena that shape the Universe."+
      " Astrophysics applies physics principles to understand the behaviour and properties of astronomical"+
      " objects. It often deals with extreme conditions and distances not found in everyday physics.",
      topics: [
        {
           id: "bh-formation", 
          title: "Black Holes", 
          description: "A black hole is a massive, compact astronomical object so dense that its gravity"+
           "prevents anything from escaping, even light.",
          imageSrc: require('../images/4.jpg'),
          content: [
            {
              id: 1,
              title: "What is a black hole?",
              description: "Black holes are made of matter packed so tightly that gravity overwhelms all other"+
              " forces. When you pick up a bowling ball, it's heavy because the matter is densely packed. If you"+
              " packed more and more mass into the same tiny space, eventually it would create gravity so strong "+
              "that it would exert a significant pull on passing rays of light. Black holes are created when massive"+
              " stars collapse at the end of their lives (and perhaps under other circumstances that we don't know"+
              " about yet). One of the first steps toward the discovery of black holes was made by University of Chicago professor Subrahmanyan Chandrasekhar, when he realized that massive stars would have to collapse after they ran out of fuel for the fusion reactions which keep them hot and bright.",
              subpoints: [
                {
                  id: 1.1,
                  title: "What's inside a black hole?",
                  description: "The short answer is that no one knows! 'In some ways that's one of the most profound"+
                  " questions in physics,' said University of Chicago Prof. Daniel Holz. 'There are not many cases in"+
                  " physics where we simply cannot predict what happens, but this is one of them.' Black holes have two parts."+
                  " There is the event horizon, which you can think of as the surface, though it's simply the point where"+
                  " the gravity gets too strong for anything to escape. And then, at the center, is the singularity."+
                  " That's the word we use to describe a point that is infinitely small and infinitely dense. We have a "+
                  "good understanding of what the event horizon looks like, thanks to the laws of general relativity. But"+
                  " as you get close to the singularity itself, we lose the ability to even predict what it looks like."
                },
                {
                  id: 1.2,
                  title: "How was the first picture of a black hole taken?",
                  description: "This is the first image of Sagittarius A*, the supermassive black hole at the center of "+
                  "our galaxy. It was captured by the Event Horizon Telescope.",
                  imageSrc: require('../images/image.png')
                }
              ]
            },
            {
              id: 2,
              title: "Biography of Stephen Hawking",
              description: "Hawking studied physics at University College, Oxford (B.A., 1962), and Trinity Hall,"+
              " Cambridge (Ph.D., 1966). He was elected a research fellow at Gonville and Caius College at Cambridge."+
              " In the early 1960s Hawking contracted amyotrophic lateral sclerosis, an incurable degenerative "+
              "neuromuscular disease. He continued to work despite the disease's progressively disabling effects."+
              " Hawking worked primarily in the field of general relativity and particularly on the physics of "+
              "black holes. In 1971 he suggested the formation, following the big bang, of numerous objects"+
              " containing as much as one billion tons of mass but occupying only the space of a proton."+
              " These objects, called mini black holes, are unique in that their immense mass and gravity require"+
              " that they be ruled by the laws of relativity, while their minute size requires that the laws of"+
              " quantum mechanics apply to them also. In 1974 Hawking proposed that, in accordance with the"+
              " predictions of quantum theory, black holes emit subatomic particles until they exhaust their"+
              " energy and finally explode. Hawking's work greatly spurred efforts to theoretically delineate"+
              " the properties of black holes, objects about which it was previously thought that nothing could"+
              " be known. His work was also important because it showed these properties' relationship to the"+
              " laws of classical thermodynamics and quantum mechanics.",
              imageSrc: require('../images/28.jpg'),
              subpoints: [
                {
                  id: 2.1,
                  title: "How Hawking Discovered Black Hole Radiation",
                  description: "In 1974, Stephen Hawking showed that black holes, which are objects that light"+
                  "cannot escape from and hence classically are at absolute zero, do radiate at temperature when"+
                  " quantum mechanical effects are taken into account. The presence of both gravitational and"+
                  " quantum mechanical constants reflects the fact that this result should somehow lie in the "+
                  "domain of quantum gravitational regime. In fact, this effect is predicted via studying quantum"+
                  " fields on the curved background of a black hole and the observation that the thermal spectrum"+
                  " of particle creation at infinity lies at temperature TH. This, of course, is not a quantum "+
                  "theory of gravity since the gravitational field, manifest in curvature of space-time, is kept"+
                   "fixed and its (quantum) dynamics is not intended to be studied. However, this is different"+
                   " from QFT on Minkowski background and hence serves as a semi-classical calculation toward"+
                   " quantum gravitational effects."
                },
                {
                  id: 2.2,
                  title: "Interesting facts about Stephen Hawking",
                  description: "1) Stephen grew up in a house where education was very important. His parents "+
                  "were both academics who had studied at Oxford University. Dinner times were often spent in"+
                  " silence while the family read books! 2) When he was a teenager, Stephen and his friends"+
                  " built a computer out of old clock parts, telephone switchboards and other recycled items."+
                  " His friends nicknamed him, 'Einstein'! 3) When Stephen was 17, he went to Oxford University "+
                  "to study physics and chemistry. He later said that he found his first year very boring! "+
                  "After graduating from Oxford, he went to Cambridge University to further his studies in"+
                  " cosmology (the science of the origin of the universe). 4) Sadly, when he was 21,"+
                  " Stephen was diagnosed with motor neurone disease (MND) and told that he only had two "+
                  "years to live. MND gradually affects the brain cells that communicate with the body's "+
                  "muscles. Over time, sufferers struggle to walk, talk and even swallow without help."+
                  " 5) Stephen used walking sticks and crutches after his diagnosis, but as his illness got "+
                  "worse he had to use an electric wheelchair to get around. He became notorious for driving"+
                  " it a little too fast around the streets of Cambridge and running over other students"+
                  " toes! 6) Stephen made many important contributions to the world of science. He developed"+
                  " theories about how the world began and furthered our understanding of black holes, stars "+
                  "and the universe. 7) Stephen was always keen for his work to be accessible to everyone, "+
                  "not just scientists. He wrote books that explained his theories in simple terms for "+
                  "everyone to understand, including a children's book. His most famous book, A Brief History"+
                  " of Time, sold more than 10 million copies! 8) In 1985, Stephen developed a "+
                  "life-threatening infection. He had an emergency operation that saved his life "+
                  "but left him unable to talk. He was given a special computer that talked for him,"+
                  " which he controlled by moving a muscle in his cheek – clever! 9) Stephen has received"+
                  " many awards for his work including the 1979 Albert Einstein Medal, the Order of "+
                  "the British Empire (Commander) in 1982 and the 1988 Wolf Prize in Physics. "+
                  "10) Stephen is remembered as an inspiration to many people. He had an amazing mind,"+
                  " incredible determination and didn't let his illness stand in his way. He defied"+
                  " doctors' predictions, living for a further 55 years after his diagnosis."
                }
              ]
            },
            {
              id: 3,
              title: "What are white holes?",
              description: "White holes emerge from the solutions of Einstein's theory of general "+
              "relativity devised by Karl Schwarzschild in 1916, just a year after the theory was first"+
              " published. A white hole is the flip of a black hole. So a white hole is almost like "+
              "anti-gravity endlessly ejecting material. With a white hole, you have an event horizon, "+
              "where stuff from the inside crosses the event horizon and gets ejected into the universe,"+
              " and you can't actually get into the white hole.",
              subpoints: [
                {
                  id: 3.1,
                  title: "Do white holes really exist?",
                  description: "The answer is no, really. I mean, there are speculations about some weird"+
                  " things in the universe that might have white hole signatures. There's nothing that we "+
                  "can point out in the same way we can point out a black hole that says, 'yes, this is a"+
                  "white hole.' Maybe that's because of the choice that we make with regard to the past and"+
                  " future, maybe there is only one real choice on the direction of the future, which means "+
                  "we can only have black holes solutions. Some scientists suggest that the fact that the "+
                  "universe is asymmetric, we see a start with the Big Bang, and we have an infinite"+
                  " future ahead of us, which means that the future gets written into the universe, it"+
                  " sets a one-way time direction which means that only the black hole solution can exist."+
                  " And so even though mathematically possible to have a white hole, the fact that our "+
                  "universe is asymmetric means that they're not physically realized."
                }
              ]
            }
          ]
        },
        { 
          id: "Theoretical astrophysics", 
          title: "Theoretical astrophysics", 
          description: "Astrophysics is a science that employs the methods and principles of physics and chemistry in the study of astronomical objects and phenomena.",
          imageSrc: require('../images/9.jpg'),
          content: [
            { id: 1,
              title: "View more",
              description: "Among the subjects studied are the Sun (solar physics), other stars, galaxies, extrasolar planets, the interstellar medium, and the cosmic microwave background.[4][5] Emissions from these objects are examined across all parts of the electromagnetic spectrum, and the properties examined include luminosity, density, temperature, and chemical composition. Because astrophysics is a very broad subject, astrophysicists apply concepts and methods from many disciplines of physics, including classical mechanics, electromagnetism, statistical mechanics, thermodynamics, quantum mechanics, relativity, nuclear and particle physics, and atomic and molecular physics."+
            " In practice, modern astronomical research often involves substantial work in the realms of theoretical and observational physics. Some areas of study for astrophysicists include the properties of dark matter, dark energy, black holes, and other celestial bodies; and the origin and ultimate fate of the universe.[4] Topics also studied by theoretical astrophysicists include Solar System formation and evolution; stellar dynamics and evolution; galaxy formation and evolution; magnetohydrodynamics; large-scale structure of matter in the universe; origin of cosmic rays; general relativity, special relativity, and quantum and physical cosmology (the physical study of the largest-scale structures of the universe), including string cosmology and astroparticle physics.",
            },
            {
              id: 2,
              title: "Observational Astrophysics",
              description: "Observational astronomy is a division of the astronomical science that is concerned with recording and interpreting data, in contrast with theoretical astrophysics, which is mainly concerned with finding out the measurable implications of physical models. It is the practice of observing celestial objects by using telescopes and other astronomical apparatus. Most astrophysical observations are made using the electromagnetic spectrum.",
              subpoints:[
                {
                  id: 2.1,
                  title: "Radio Astronomy",
                  description: "Radio astronomy studies radiation with a wavelength greater than a few millimeters. Example areas of study are radio waves, usually emitted by cold objects such as interstellar gas and dust clouds; the cosmic microwave background radiation which is the redshifted light from the Big Bang; pulsars, which were first detected at microwave frequencies. The study of these waves requires very large radio telescopes."
                },
                {
                  id: 2.2,
                  title:"Infrared Astronomy ",
                  description:"Infrared astronomy studies radiation with a wavelength that is too long to be visible to the naked eye but is shorter than radio waves. Infrared observations are usually made with telescopes similar to the familiar optical telescopes. Objects colder than stars (such as planets) are normally studied at infrared frequencies."
                }
                ,
                {
                  id: 2.3,
                  title:"Optical astronomy",
                  description:"Optical astronomy was the earliest kind of astronomy. Telescopes paired with a charge-coupled device or spectroscopes are the most common instruments used. The Earth's atmosphere interferes somewhat with optical observations, so adaptive optics and space telescopes are used to obtain the highest possible image quality. In this wavelength range, stars are highly visible, and many chemical spectra can be observed to study the chemical composition of stars, galaxies, and nebulae."
                }
                ,
                {
                  id: 2.4,
                  title:"Ultraviolet, X-ray and gamma ray astronomy",
                  description:"Ultraviolet, X-ray and gamma ray astronomy study very energetic processes such as binary pulsars, black holes, magnetars, and many others. These kinds of radiation do not penetrate the Earth's atmosphere well. There are two methods in use to observe this part of the electromagnetic spectrum—space-based telescopes and ground-based imaging air Cherenkov telescopes (IACT). Examples of Observatories of the first type are RXTE, the Chandra X-ray Observatory and the Compton Gamma Ray Observatory. Examples of IACTs are the High Energy Stereoscopic System (H.E.S.S.) and the MAGIC telescope."
                }
              ]
            }
          ]
        },
        { 
           
  id: "Exoplanet", 
  title: "Exoplanet", 
  description: "An exoplanet is any planet beyond our solar system. Most of them orbit other stars, but some free-floating exoplanets, called rogue planets, are untethered to any star. We've confirmed more than 5,800 exoplanets out of the billions that we believe exist.",
  imageSrc: require('../images/10.jpg'),
  content:[
    {
      id:1,
      title: "See More",
      description:"An exoplanet or extrasolar planet is a planet outside the Solar System. The first possible evidence of an exoplanet was noted in 1917 but was not then recognized as such. The first confirmed detection of an exoplanet was in 1992 around a pulsar, and the first detection around a main-sequence star was in 1995. A different planet, first detected in 1988, was confirmed in 2003. As of 26 March 2025, there are 5,867 confirmed exoplanets in 4,377 planetary systems, with 985 systems having more than one planet.[1][2] In collaboration with ground-based and other space-based observatories the James Webb Space Telescope (JWST) is expected to give more insight into exoplanet traits, such as their composition, environmental conditions, and potential for life.[3]"+
      "There are many methods of detecting exoplanets. Transit photometry and Doppler spectroscopy have found the most, but these methods suffer from a clear observational bias favoring the detection of planets near the star; thus, 85% of the exoplanets detected are inside the tidal locking zone.[4] In several cases, multiple planets have been observed around a star.[5] About 1 in 5 Sun-like stars are estimated to have an 'Earth-sized' planet in the habitable zone.[6][7] Assuming there are 200 billion stars in the Milky Way, it can be hypothesized that there are 11 billion potentially habitable Earth-sized planets in the Milky Way, rising to 40 billion if planets orbiting the numerous red dwarfs are included.[8]"+
      "The least massive exoplanet known is Draugr (also known as PSR B1257+12 A or PSR B1257+12 b), which is about twice the mass of the Moon. The most massive exoplanet listed on the NASA Exoplanet Archive is HR 2562 b,[9][10][11] about 30 times the mass of Jupiter. However, according to some definitions of a planet (based on the nuclear fusion of deuterium[12]), it is too massive to be a planet and might be a brown dwarf. Known orbital times for exoplanets vary from less than an hour (for those closest to their star) to thousands of years. Some exoplanets are so far away from the star that it is difficult to tell whether they are gravitationally bound to it."+
      "Almost all planets detected so far are within the Milky Way. However, there is evidence that extragalactic planets, exoplanets located in other galaxies, may exist.[13][14] The nearest exoplanets are located 4.2 light-years (1.3 parsecs) from Earth and orbit Proxima Centauri, the closest star to the Sun."+
      "The discovery of exoplanets has intensified interest in the search for extraterrestrial life. There is special interest in planets that orbit in a star's habitable zone (sometimes called 'Goldilocks zone'), where it is possible for liquid water, a prerequisite for life as we know it, to exist on the surface. However, the study of planetary habitability also considers a wide range of other factors in determining the suitability of a planet for hosting life.[16]"+
      "Rogue planets are those that are not in planetary systems. Such objects are generally considered in a separate category from planets, especially if they are gas giants, often counted as sub-brown dwarfs.[17] The rogue planets in the Milky Way possibly number in the billions or more."
    },
    {
                id:2,
              title: "Overview",
              description:"Most of the exoplanets discovered so far are in a relatively small region of our galaxy, the Milky Way. (“Small” meaning within thousands of light-years of our solar system; one light-year equals 5.88 trillion miles, or 9.46 trillion kilometers.) Even the closest known exoplanet to Earth, Proxima Centauri b, is still about 4 light-years away. We know there are more planets than stars in the galaxy."+
              "By measuring exoplanets’ sizes (diameters) and masses (weights), we can see compositions ranging from rocky (like Earth and Venus) to gas-rich (like Jupiter and Saturn). Some planets may be dominated by water or ice, while others are dominated by iron or carbon. We’ve identified lava worlds covered in molten seas, puffy planets the density of Styrofoam and dense cores of planets still orbiting their stars."
            }
          ]
        }]
    },
    { 
      id: 2, 
      title: "Quantum Physics", 
      imageSrc: require('../images/5.jpg'),
      description: "Quantum physics is the study of matter and energy at the most fundamental level. It aims to uncover the properties and behaviors of the very building blocks of nature. While many quantum experiments examine very small objects, such as electrons and photons, quantum phenomena are all around us, acting on every scale.",
      topics: [
        { 
          id: "Quantum entanglement", 
          title: "Quantum Entanglement", 
          description: "Quantum entanglement is the phenomenon of a group of particles being generated, interacting, or sharing spatial proximity in a manner such that the quantum state of each particle of the group cannot be described independently of the state of the others, including when the particles are separated by a large distance.",
          imageSrc: require('../images/11.jpg')
        },
        { 
          id: "Wave-particle duality", 
          title: "Wave-Particle Duality", 
          description: "Wave–particle duality is the concept in quantum mechanics that fundamental entities of the universe, like photons and electrons, exhibit particle or wave properties according to the experimental circumstances.",
          imageSrc: require('../images/12.jpg')
        },
        { 
          id: "density state", 
          title: "Density State", 
          description: "The density of states is a central concept in the development and application of RRKM theory. The density of states of a classical system is the number of states of that system per unit energy, expressed as a function of energy. This quantity may be formulated as a phase space integral in several ways.",
          imageSrc: require('../images/13.jpg')
        }]
    },
    { 
      id: 3, 
      title: "Fluid Dynamic", 
      imageSrc: require('../images/6.jpg'),
      description: "In physics, physical chemistry and engineering, fluid dynamics is a subdiscipline of fluid mechanics that describes the flow of fluids – liquids and gases. It has several subdisciplines, including aerodynamics (the study of air and other gases in motion) and hydrodynamics (the study of water and other liquids in motion). Fluid dynamics has a wide range of applications, including calculating forces and moments on aircraft, determining the mass flow rate of petroleum through pipelines, predicting weather patterns, understanding nebulae in interstellar space, understanding large scale geophysical flows involving oceans/atmosphere and modelling fission weapon detonation.",
      topics: [
        { 
          id: "Multiphase flows", 
          title: "Multiphase Flows", 
          description: "In fluid mechanics, multiphase flow is the simultaneous flow of materials with two or more thermodynamic phases.[1] Virtually all processing technologies from cavitating pumps and turbines to paper-making and the construction of plastics involve some form of multiphase flow. It is also prevalent in many natural phenomena.",
          imageSrc: require('../images/14.jpg')
        },
        { 
          id: "Turbulence modeling", 
          title: "Turbulence Modeling", 
          description: "In fluid dynamics, turbulence modeling is the construction and use of a mathematical model to predict the effects of turbulence. Turbulent flows are commonplace in most real-life scenarios. In spite of decades of research, there is no analytical theory to predict the evolution of these turbulent flows. The equations governing turbulent flows can only be solved directly for simple cases of flow. For most real-life turbulent flows, CFD simulations use turbulent models to predict the evolution of turbulence. These turbulence models are simplified constitutive equations that predict the statistical evolution of turbulent flows.",
          imageSrc: require('../images/15.png')
        },
        { 
          id: "Computational fluid dynamics", 
          title: "Computational Fluid Dynamics", 
          description: "Computational fluid dynamics (CFD) is the science of using computers to predict liquid and gas flows based on the governing equations of conservation of mass, momentum, and energy.",
          imageSrc: require('../images/16.jpg')
        }]
    },
    { 
      id: 4, 
      title: "Optics", 
      imageSrc: require('../images/7.jpg'),
      description: "Light is a form of energy that enables us to see and perceive objects with our eyes." +
"Scientifically, light is an electromagnetic wave of wavelength belonging to visible part (wavelength of 400 nm to 750 nm) of electromagnetic spectrum. We see objects either by the light they produce or by the light they reflect from other objects. Objects that produce their own light are said to be luminous. Examples are the sun, electric bulbs, candle light etc., whereas, non luminous objects do not produce their own light. We can see these objects only when light fall on them from other sources and it is thrown back or reflected into our eyes."+
"An important example is that of the moon, which shines in the night because it reflects light coming from the sun and not because it is luminous."+
"Optics is the science or more specifically a branch of physics in which we study the behavior and properties of light. The study also includes the interaction of light with matter and construction of instruments that use or detect it. For the sake of convenience the subject of optics can be divided into two parts: i) physical or wave optics, which deals with the wave nature of light. It accounts for optical effects such as diffraction and interference etc., and (ii) geometrical or ray optics, which deals with the formation of images by lenses and mirrors and their combinations on the basis of certain geometrical laws obeyed by light.",
      topics: [
        { 
          id: "Refraction", 
          title: "Refraction", 
          description: "In physics, refraction is the redirection of a wave as it passes from one medium to another. The redirection can be caused by the wave's change in speed or by a change in the medium. Refraction of light is the most commonly observed phenomenon, but other waves such as sound waves and water waves also experience refraction. How much a wave is refracted is determined by the change in wave speed and the initial direction of wave propagation relative to the direction of change in speed.",
          imageSrc: require('../images/17.jpg')
        },
        { 
          id: "Optical devices", 
          title: "Optical Devices", 
          description: "Optical instruments are the devices that process light waves to enhance an image for a more clear view. The use of optical instruments, such as a magnifying lens or any complicated device like a microscope or telescope, usually makes things bigger and helps us see in a more detailed manner.",
          imageSrc: require('../images/18.jpg')

        },
        { 
          id: "Nonlinear optics", 
          title: "Nonlinear Optics", 
          description: "Nonlinear optics is the branch of optics that studies the properties and the interaction of light in a medium where the polarization density interacts nonlinearly with the electric field of light.",
          imageSrc: require('../images/19.jpg')
        }]
    },
    { 
      id: 5, 
      title: "Atomic Physics", 
      imageSrc: require('../images/20.jpg'),
      description: "NASA has announced the discovery of three potentially habitable exoplanets orbiting a nearby star system.",
      category: "discovery",
      topics: [
        { 
          id: "Electric charges and fields", 
          title: "Electric Charges and Fields", 
          description: "Electric charge can be defined as a fundamental property of subatomic particles that gives rise to the phenomenon of experiencing force in the presence of electric and magnetic fields. These fields exert influence on charged particles, resulting in observable effects.",
          imageSrc: require('../images/25.jpg')
        },
        { 
          id: "Magnetism", 
          title: "Magnetism", 
          description: "Magnetism is the class of physical attributes that occur through a magnetic field, which allows objects to attract or repel each other. Because both electric currents and magnetic moments of elementary particles give rise to a magnetic field, magnetism is one of two aspects of electromagnetism.",
          imageSrc: require('../images/26.jpg')
        },
        { 
          id: "Electromagnetic induction", 
          title: "Electromagnetic Induction", 
          description: "Electromagnetic Induction is a current produced because of voltage production (electromotive force) due to a changing magnetic field. This either happens when a conductor is placed in a moving magnetic field (when using an AC power source) or when a conductor is constantly moving in a stationary magnetic field.",
          imageSrc: require('../images/27.jpg')
        }]
    },
    { 
      id: 6, 
      title: "high-energy particle physics and nuclear physics", 
      imageSrc: require('../images/21.jpg'),
      description: "Astronomers have documented the early stages of a galactic collision approximately 3.2 billion light-years from Earth.",
      topics: [
        { 
          id: "nuclear forces", 
          title: "Nuclear Forces", 
          description: "The nuclear force (or nucleon–nucleon interaction, residual strong force, or, historically, strong nuclear force) is a force that acts between hadrons, most commonly observed between protons and neutrons of atoms. Neutrons and protons, both nucleons, are affected by the nuclear force almost identically. Since protons have charge +1 e, they experience an electric force that tends to push them apart, but at short range the attractive nuclear force is strong enough to overcome the electrostatic force. The nuclear force binds nucleons into atomic nuclei.",
          imageSrc: require('../images/22.jpg')
        },
        { 
          id: "shell structure of the nucleus", 
          title: "Shell Structure Of The Nucleus", 
          description: "In nuclear physics, atomic physics, and nuclear chemistry, the nuclear shell model utilizes the Pauli exclusion principle to model the structure of atomic nuclei in terms of energy levels.[1] The first shell model was proposed by Dmitri Ivanenko (together with E. Gapon) in 1932. The model was developed in 1949 following independent work by several physicists, most notably Maria Goeppert Mayer and J. Hans D. Jensen, who received the 1963 Nobel Prize in Physics for their contributions to this model, and Eugene Wigner, who received the Nobel Prize alongside them for his earlier groundlaying work on the atomic nuclei.",
          imageSrc: require('../images/23.jpg')
        },
        { 
          id: "Radiation", 
          title: "Radiation", 
          description: "Radiation is energy that moves from one place to another in a form that can be described as waves or particles. We are exposed to radiation in our everyday life. Some of the most familiar sources of radiation include the sun, microwave ovens in our kitchens and the radios we listen to in our cars.",
          imageSrc: require('../images/24.jpg')
        }]
    }
  ];
  
  const newsData = [
    { 
      id: 1, 
      title: "Quantum Computers Just Got Smart Enough to Study Their Own Entanglement", 
      imageSrc: require('../images/news5.jpg'),
      summary: "Recent discoveries made by the James Webb Space Telescope are challenging conventional theories about galaxy formation in the early universe.",
      date: "March 29, 2025",
      author: "Dr. Sarah Chen",
      externalLink: "https://scitechdaily.com/quantum-computers-just-got-smart-enough-to-study-their-own-entanglement/"
    },
    { 
      id: 2, 
      title: "‘The physics community has never split like this’: row erupts over plans for new Large Hadron Collider", 
      imageSrc: require('../images/news6.jpg'),
      summary: "Recent discoveries made by the James Webb Space Telescope are challenging conventional theories about galaxy formation in the early universe.",
      date: "March 29, 2025",
      author: "Dr. Sarah Chen",
      externalLink: "https://www.theguardian.com/science/2025/mar/29/the-physics-community-has-never-split-like-this-row-erupts-over-plans-for-new-large-hadron-collider"
    },
    { 
      id: 3, 
      title: "Is Dark Energy Getting Weaker? New Evidence Strengthens the Case.", 
      imageSrc: require('../images/news2.jpg'),
      summary: "Recent discoveries made by the James Webb Space Telescope are challenging conventional theories about galaxy formation in the early universe.",
      date: "March 19, 2025",
      author: "Charlie Wood",
      externalLink: "https://www.quantamagazine.org/is-dark-energy-getting-weaker-new-evidence-strengthens-the-case-20250319/"

    },
    { 
      id: 4, 
      title: "The Road Map to Alien Life Passes Through the ‘Cosmic Shoreline’", 
      imageSrc: require('../images/news3.jpg'),
      summary: "NASA and ESA have announced joint plans for a new mission to study the outer planets of our solar system, with launches planned for 2028.",
      date: "March 19, 2025",
      author: "Elise Cutts",
      externalLink: "https://www.quantamagazine.org/the-road-map-to-alien-life-passes-through-the-cosmic-shoreline-20250312/"

    },
    { 
      id: 5, 
      title: "New Maps of the Bizarre, Chaotic Space-Time Inside Black Holes", 
      imageSrc: require('../images/news4.jpg'),
      summary: "Scientists at LIGO have developed new techniques for filtering gravitational wave signals, potentially enabling detection of previously unobservable cosmic events.",
      date: "Febuary 24, 2025",
      author: "Lyndie Chiou",
      externalLink: "https://www.quantamagazine.org/new-maps-of-the-bizarre-chaotic-space-time-inside-black-holes-20250224/"

    },
    { 
      id: 6, 
      title: "How Noether’s Theorem Revolutionized Physics", 
      imageSrc: require('../images/news1.jpg'),
      summary: "Three leading private space companies have announced a joint venture to establish a permanent research facility on the lunar surface by 2030.",
      date: "March 12, 2025",
      author: "Shalma Wegsman",
      externalLink: "https://www.quantamagazine.org/how-noethers-theorem-revolutionized-physics-20250207/"

    }
  ];
  
  export { eventsData, newsData };

  