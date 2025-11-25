export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      comparison: 'Comparaison',
      simulation: 'Simulation',
      digitalTwin: 'Digital Twin'
    },
    
    // Page d'accueil
    home: {
      hero: {
        badge: 'Créé par OUGO',
        title: 'Protocoles de Communication',
        titleHighlight: 'Automobile',
        subtitle: 'Explorez en profondeur les protocoles qui permettent aux véhicules modernes de fonctionner : CAN, CAN FD, LIN, FlexRay, MOST et Ethernet automobile. Comprenez leur architecture, leurs trames et leur fonctionnement temps réel.',
        compareBtn: 'Comparer les Protocoles',
        simulateBtn: 'Voir les Simulations',
        stats: {
          protocols: 'Protocoles',
          ecus: 'ECUs par véhicule',
          maxSpeed: 'Débit max Ethernet'
        }
      },
      protocols: {
        title: 'Les Protocoles Automobiles',
        subtitle: 'Découvrez les six protocoles majeurs utilisés dans les réseaux embarqués des véhicules modernes. Chacun répond à des besoins spécifiques.'
      },
      architecture: {
        title: 'Architecture Réseau Véhicule',
        subtitle: 'Un véhicule moderne contient plusieurs domaines fonctionnels, chacun utilisant le protocole le plus adapté à ses besoins.',
        gateway: 'Gateway Central',
        gatewayDesc: 'Routage inter-protocoles',
        domains: {
          powertrain: {
            title: 'Powertrain',
            ecu1: 'ECU Moteur',
            ecu2: 'Transmission',
            ecu3: 'Gestion Batterie'
          },
          chassis: {
            title: 'Chassis / Safety',
            ecu1: 'Direction EPS',
            ecu2: 'ABS / ESP',
            ecu3: 'Suspension Active'
          },
          body: {
            title: 'Body / Confort',
            ecu1: 'Vitres / Rétros',
            ecu2: 'Sièges',
            ecu3: 'Climatisation'
          },
          infotainment: {
            title: 'Infotainment',
            ecu1: 'Head Unit',
            ecu2: 'Amplificateur',
            ecu3: 'Écrans'
          },
          adas: {
            title: 'ADAS',
            ecu1: 'Caméras',
            ecu2: 'Radar / LiDAR',
            ecu3: 'Fusion Capteurs'
          }
        }
      },
      features: {
        title: 'Fonctionnalités Interactives',
        subtitle: 'Des outils pédagogiques pour comprendre en profondeur le fonctionnement des réseaux automobiles.',
        comparison: {
          title: 'Comparaison Détaillée',
          desc: 'Comparez les protocoles selon de nombreux critères : débit, payload, topologie, déterminisme, coût et cas d\'utilisation.',
          link: 'Explorer la comparaison'
        },
        simulation: {
          title: 'Simulation Temps Réel',
          desc: 'Visualisez l\'arbitrage CAN, la transmission de trames, le scheduling LIN et les cycles FlexRay en temps réel.',
          link: 'Lancer les simulations'
        },
        digitalTwin: {
          title: 'Digital Twin',
          desc: 'Explorez un jumeau numérique d\'un réseau véhicule complet avec tous ses domaines et protocoles interconnectés.',
          link: 'Voir le Digital Twin'
        }
      },
      timeline: {
        title: 'Évolution des Protocoles',
        subtitle: 'L\'histoire des protocoles de communication automobile, des années 1980 à aujourd\'hui.',
        can: 'Bosch développe le CAN pour réduire le câblage complexe dans les véhicules. Premier standard de communication automobile.',
        lin: 'Consortium BMW, VW, Audi crée le LIN comme solution low-cost pour les capteurs et actionneurs simples.',
        most: 'MOST25 introduit pour le streaming audio/vidéo haute qualité via fibre optique dans les véhicules premium.',
        flexray: 'Premier protocole déterministe pour les applications safety-critical comme le brake-by-wire et steer-by-wire.',
        canfd: 'Bosch étend le CAN avec des payloads jusqu\'à 64 octets et des débits jusqu\'à 8 Mbit/s pour l\'ADAS.',
        ethernet: '100BASE-T1 standardisé. Début de la convergence vers l\'Ethernet pour unifier tous les domaines véhicule.'
      },
      cta: {
        title: 'Prêt à Explorer ?',
        subtitle: 'Commencez votre apprentissage des protocoles de communication automobile avec nos simulations interactives et notre digital twin.',
        simulateBtn: 'Commencer les Simulations',
        twinBtn: 'Explorer le Digital Twin'
      }
    },
    
    // Page de comparaison
    comparison: {
      title: 'Comparaison des Protocoles',
      subtitle: 'Analysez et comparez les caractéristiques techniques des protocoles de communication automobile selon différents critères.',
      selectProtocols: 'Sélectionnez les protocoles à comparer',
      tabs: {
        table: 'Tableau Comparatif',
        charts: 'Graphiques',
        usecases: 'Cas d\'Utilisation'
      },
      criteria: 'Critère',
      charts: {
        bitrate: 'Débit Maximum (échelle logarithmique)',
        payload: 'Taille Payload Maximum (octets)',
        multiCriteria: 'Comparaison Multi-Critères'
      },
      usecases: {
        recommended: 'Protocoles Recommandés',
        examples: 'Exemples d\'Applications'
      },
      summary: {
        title: 'Résumé des Forces',
        reliable: {
          title: 'Le Plus Fiable',
          protocol: 'CAN / CAN FD',
          desc: 'Excellente gestion des erreurs avec 5 mécanismes de détection'
        },
        fastest: {
          title: 'Le Plus Rapide',
          protocol: 'Automotive Ethernet',
          desc: 'Jusqu\'à 10 Gbit/s pour les applications haute performance'
        },
        cheapest: {
          title: 'Le Moins Cher',
          protocol: 'LIN',
          desc: 'Un seul fil, parfait pour les capteurs et actionneurs simples'
        },
        deterministic: {
          title: 'Le Plus Déterministe',
          protocol: 'FlexRay',
          desc: 'TDMA garantit des temps de transmission prévisibles'
        },
        multimedia: {
          title: 'Meilleur pour le Multimédia',
          protocol: 'MOST',
          desc: 'Streaming synchrone optimisé pour l\'audio/vidéo'
        },
        versatile: {
          title: 'Le Plus Polyvalent',
          protocol: 'CAN FD',
          desc: 'Combine compatibilité CAN et performances améliorées'
        }
      },
      characteristics: 'Caractéristiques',
      speed: 'Débit',
      maxSpeed: 'Débit Maximum',
      topology: 'Topologie',
      busLength: 'Longueur Bus Max',
      nodesMax: 'Nœuds Maximum',
      latency: 'Latence',
      errorDetection: 'Détection Erreurs',
      applications: 'Applications',
      advantages: 'Avantages',
      disadvantages: 'Inconvénients',
      faultTolerant: 'Tolérant aux pannes',
      realTime: 'Temps Réel',
      deterministic: 'Déterministe',
      cost: 'Coût',
      low: 'Faible',
      medium: 'Moyen',
      high: 'Élevé',
      yes: 'Oui',
      no: 'Non',
      payload: 'Payload Max',
      medium_access: 'Accès Médium',
      physical_layer: 'Couche Physique'
    },
    
    // Page de simulation
    simulation: {
      title: 'Simulations Interactives des Protocoles',
      subtitle: 'Expérimentez les protocoles de communication automobile en action',
      selectProtocol: 'Sélectionnez un protocole',
      start: 'Démarrer',
      stop: 'Arrêter',
      pause: 'Pause',
      resume: 'Reprendre',
      reset: 'Réinitialiser',
      speed: 'Vitesse',
      messages: 'Messages',
      errors: 'Erreurs',
      busLoad: 'Charge Bus',
      frameDetails: 'Détails de la Trame',
      transmitting: 'Transmission en cours',
      idle: 'En attente',
      arbitration: 'Arbitration',
      dataField: 'Champ de données',
      identifier: 'Identifiant',
      dlc: 'DLC',
      crc: 'CRC',
      ack: 'ACK',
      nodes: 'Nœuds',
      master: 'Maître',
      slave: 'Esclave',
      staticSlot: 'Slot Statique',
      dynamicSlot: 'Slot Dynamique',
      cycle: 'Cycle',
      packets: 'Paquets',
      bandwidth: 'Bande Passante',
      canTitle: 'Simulation CAN Bus',
      canDesc: 'Visualisez l\'arbitrage et la transmission des trames CAN',
      linTitle: 'Simulation LIN Bus',
      linDesc: 'Observez la communication maître-esclave du protocole LIN',
      flexrayTitle: 'Simulation FlexRay',
      flexrayDesc: 'Explorez les cycles statiques et dynamiques de FlexRay',
      ethernetTitle: 'Simulation Ethernet Automobile',
      ethernetDesc: 'Découvrez les communications haute vitesse Ethernet'
    },
    
    // Digital Twin
    digitalTwin: {
      title: 'Digital Twin Véhicule',
      subtitle: 'Jumeau numérique interactif d\'un réseau automobile complet avec simulation temps réel',
      views: {
        vehicle: 'Vue Véhicule',
        network: 'Topologie Réseau',
        dashboard: 'Tableau de Bord',
        dataflow: 'Flux de Données'
      },
      controls: {
        start: 'Démarrer Simulation',
        stop: 'Arrêter',
        scenario: 'Scénario'
      },
      scenarios: {
        normal: 'Conduite Normale',
        highway: 'Autoroute',
        city: 'Ville',
        sport: 'Mode Sport',
        eco: 'Mode Éco',
        emergency: 'Urgence'
      },
      sensors: {
        title: 'Capteurs',
        radar: 'Radar',
        lidar: 'LiDAR',
        camera: 'Caméra',
        ultrasonic: 'Ultrasons',
        temperature: 'Température',
        pressure: 'Pression',
        speed: 'Vitesse',
        rpm: 'Régime Moteur',
        fuel: 'Carburant',
        battery: 'Batterie'
      },
      ecus: {
        title: 'Calculateurs (ECU)',
        engine: 'Moteur',
        transmission: 'Transmission',
        brakes: 'Freins',
        steering: 'Direction',
        airbag: 'Airbag',
        climate: 'Climatisation',
        infotainment: 'Infotainment',
        adas: 'ADAS',
        body: 'Carrosserie',
        gateway: 'Gateway'
      },
      network: {
        title: 'Réseau',
        canBus: 'Bus CAN',
        linBus: 'Bus LIN',
        flexray: 'FlexRay',
        ethernet: 'Ethernet',
        messages: 'Messages',
        bandwidth: 'Bande Passante',
        load: 'Charge',
        errors: 'Erreurs',
        breakdown: 'Répartition par Protocole'
      },
      dashboard: {
        speed: 'Vitesse',
        rpm: 'Régime',
        fuel: 'Carburant',
        temperature: 'Température',
        battery: 'Batterie',
        gear: 'Rapport'
      },
      alerts: {
        title: 'Alertes Système',
        critical: 'Critique',
        warning: 'Attention',
        info: 'Information',
        noAlerts: 'Aucune alerte - Système nominal'
      },
      stats: {
        totalData: 'Données Transmises',
        totalMessages: 'Messages Totaux',
        networkStatus: 'État Réseau',
        criticalAlerts: 'Alertes Critiques',
        active: 'ACTIF',
        stopped: 'ARRÊTÉ'
      },
      messageLog: {
        title: 'Journal des Messages',
        time: 'Temps',
        protocol: 'Protocole',
        id: 'ID',
        data: 'Données',
        source: 'Source',
        destination: 'Destination'
      }
    },
    
    // Footer
    footer: {
      description: 'Votre référence pour comprendre et maîtriser les protocoles de communication automobile modernes.',
      protocols: 'Protocoles',
      resources: 'Ressources',
      developer: 'Développeur',
      copyright: 'AutoNet Architecture. Tous droits réservés.',
      platform: 'Plateforme complète pour l\'exploration des réseaux de communication automobile.'
    },
    
    // Protocol Detail
    protocolDetail: {
      notFound: 'Protocole non trouvé',
      notFoundDesc: 'Le protocole demandé n\'existe pas.',
      backHome: 'Retour à l\'accueil',
      backToProtocols: 'Retour aux protocoles',
      year: 'Année',
      standard: 'Standard',
      inventor: 'Inventeur',
      technicalCharacteristics: 'Caractéristiques Techniques',
      maxBitrate: 'Débit Maximum',
      payloadSize: 'Taille Payload',
      topology: 'Topologie',
      physicalMedium: 'Support Physique',
      nodeCount: 'Nombre de Nœuds',
      determinism: 'Déterminisme',
      frameStructure: 'Structure de la Trame',
      arbitrationMechanism: 'Mécanisme d\'Arbitrage',
      arbitrationRules: 'Règles d\'Arbitrage',
      arbitrationExample: 'Exemple d\'Arbitrage',
      node: 'Nœud',
      wins: 'GAGNE',
      loses: 'PERD',
      physicalLayer: 'Couche Physique',
      voltageLevels: 'Niveaux de Tension',
      recessive: 'Récessif',
      dominant: 'Dominant',
      termination: 'Terminaison',
      errorHandling: 'Gestion des Erreurs',
      errorCounters: 'Compteurs d\'Erreurs',
      errorStates: 'États d\'Erreur',
      applications: 'Applications',
      advantages: 'Avantages',
      disadvantages: 'Inconvénients',
      exploreOther: 'Explorer d\'autres protocoles'
    },
    
    // Commun
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      learnMore: 'En savoir plus',
      seeMore: 'Voir plus',
      close: 'Fermer',
      yes: 'Oui',
      no: 'Non'
    }
  },
  
  en: {
    // Navigation
    nav: {
      home: 'Home',
      comparison: 'Comparison',
      simulation: 'Simulation',
      digitalTwin: 'Digital Twin'
    },
    
    // Home page
    home: {
      hero: {
        badge: 'Created by OUGO',
        title: 'Automotive Communication',
        titleHighlight: 'Protocols',
        subtitle: 'Explore in depth the protocols that enable modern vehicles to function: CAN, CAN FD, LIN, FlexRay, MOST and Automotive Ethernet. Understand their architecture, frames and real-time operation.',
        compareBtn: 'Compare Protocols',
        simulateBtn: 'View Simulations',
        stats: {
          protocols: 'Protocols',
          ecus: 'ECUs per vehicle',
          maxSpeed: 'Max Ethernet Speed'
        }
      },
      protocols: {
        title: 'Automotive Protocols',
        subtitle: 'Discover the six major protocols used in embedded networks of modern vehicles. Each meets specific needs.'
      },
      architecture: {
        title: 'Vehicle Network Architecture',
        subtitle: 'A modern vehicle contains several functional domains, each using the protocol best suited to its needs.',
        gateway: 'Central Gateway',
        gatewayDesc: 'Inter-protocol routing',
        domains: {
          powertrain: {
            title: 'Powertrain',
            ecu1: 'Engine ECU',
            ecu2: 'Transmission',
            ecu3: 'Battery Management'
          },
          chassis: {
            title: 'Chassis / Safety',
            ecu1: 'EPS Steering',
            ecu2: 'ABS / ESP',
            ecu3: 'Active Suspension'
          },
          body: {
            title: 'Body / Comfort',
            ecu1: 'Windows / Mirrors',
            ecu2: 'Seats',
            ecu3: 'Climate Control'
          },
          infotainment: {
            title: 'Infotainment',
            ecu1: 'Head Unit',
            ecu2: 'Amplifier',
            ecu3: 'Displays'
          },
          adas: {
            title: 'ADAS',
            ecu1: 'Cameras',
            ecu2: 'Radar / LiDAR',
            ecu3: 'Sensor Fusion'
          }
        }
      },
      features: {
        title: 'Interactive Features',
        subtitle: 'Educational tools to understand in depth how automotive networks work.',
        comparison: {
          title: 'Detailed Comparison',
          desc: 'Compare protocols according to many criteria: speed, payload, topology, determinism, cost and use cases.',
          link: 'Explore comparison'
        },
        simulation: {
          title: 'Real-Time Simulation',
          desc: 'Visualize CAN arbitration, frame transmission, LIN scheduling and FlexRay cycles in real-time.',
          link: 'Launch simulations'
        },
        digitalTwin: {
          title: 'Digital Twin',
          desc: 'Explore a digital twin of a complete vehicle network with all its interconnected domains and protocols.',
          link: 'View Digital Twin'
        }
      },
      timeline: {
        title: 'Protocol Evolution',
        subtitle: 'The history of automotive communication protocols, from the 1980s to today.',
        can: 'Bosch develops CAN to reduce complex wiring in vehicles. First automotive communication standard.',
        lin: 'BMW, VW, Audi consortium creates LIN as a low-cost solution for simple sensors and actuators.',
        most: 'MOST25 introduced for high-quality audio/video streaming via fiber optic in premium vehicles.',
        flexray: 'First deterministic protocol for safety-critical applications like brake-by-wire and steer-by-wire.',
        canfd: 'Bosch extends CAN with payloads up to 64 bytes and speeds up to 8 Mbit/s for ADAS.',
        ethernet: '100BASE-T1 standardized. Beginning of convergence towards Ethernet to unify all vehicle domains.'
      },
      cta: {
        title: 'Ready to Explore?',
        subtitle: 'Start learning about automotive communication protocols with our interactive simulations and digital twin.',
        simulateBtn: 'Start Simulations',
        twinBtn: 'Explore Digital Twin'
      }
    },
    
    // Comparison page
    comparison: {
      title: 'Protocol Comparison',
      subtitle: 'Analyze and compare the technical characteristics of automotive communication protocols according to different criteria.',
      selectProtocols: 'Select protocols to compare',
      tabs: {
        table: 'Comparison Table',
        charts: 'Charts',
        usecases: 'Use Cases'
      },
      criteria: 'Criteria',
      charts: {
        bitrate: 'Maximum Bitrate (logarithmic scale)',
        payload: 'Maximum Payload Size (bytes)',
        multiCriteria: 'Multi-Criteria Comparison'
      },
      usecases: {
        recommended: 'Recommended Protocols',
        examples: 'Application Examples'
      },
      summary: {
        title: 'Strengths Summary',
        reliable: {
          title: 'Most Reliable',
          protocol: 'CAN / CAN FD',
          desc: 'Excellent error handling with 5 detection mechanisms'
        },
        fastest: {
          title: 'Fastest',
          protocol: 'Automotive Ethernet',
          desc: 'Up to 10 Gbit/s for high-performance applications'
        },
        cheapest: {
          title: 'Most Affordable',
          protocol: 'LIN',
          desc: 'Single wire, perfect for simple sensors and actuators'
        },
        deterministic: {
          title: 'Most Deterministic',
          protocol: 'FlexRay',
          desc: 'TDMA guarantees predictable transmission times'
        },
        multimedia: {
          title: 'Best for Multimedia',
          protocol: 'MOST',
          desc: 'Synchronous streaming optimized for audio/video'
        },
        versatile: {
          title: 'Most Versatile',
          protocol: 'CAN FD',
          desc: 'Combines CAN compatibility with improved performance'
        }
      },
      characteristics: 'Characteristics',
      speed: 'Speed',
      maxSpeed: 'Maximum Speed',
      topology: 'Topology',
      busLength: 'Max Bus Length',
      nodesMax: 'Maximum Nodes',
      latency: 'Latency',
      errorDetection: 'Error Detection',
      applications: 'Applications',
      advantages: 'Advantages',
      disadvantages: 'Disadvantages',
      faultTolerant: 'Fault Tolerant',
      realTime: 'Real-Time',
      deterministic: 'Deterministic',
      cost: 'Cost',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      yes: 'Yes',
      no: 'No',
      payload: 'Max Payload',
      medium_access: 'Medium Access',
      physical_layer: 'Physical Layer'
    },
    
    // Simulation page
    simulation: {
      title: 'Interactive Protocol Simulations',
      subtitle: 'Experience automotive communication protocols in action',
      selectProtocol: 'Select a protocol',
      start: 'Start',
      stop: 'Stop',
      pause: 'Pause',
      resume: 'Resume',
      reset: 'Reset',
      speed: 'Speed',
      messages: 'Messages',
      errors: 'Errors',
      busLoad: 'Bus Load',
      frameDetails: 'Frame Details',
      transmitting: 'Transmitting',
      idle: 'Idle',
      arbitration: 'Arbitration',
      dataField: 'Data Field',
      identifier: 'Identifier',
      dlc: 'DLC',
      crc: 'CRC',
      ack: 'ACK',
      nodes: 'Nodes',
      master: 'Master',
      slave: 'Slave',
      staticSlot: 'Static Slot',
      dynamicSlot: 'Dynamic Slot',
      cycle: 'Cycle',
      packets: 'Packets',
      bandwidth: 'Bandwidth',
      canTitle: 'CAN Bus Simulation',
      canDesc: 'Visualize arbitration and CAN frame transmission',
      linTitle: 'LIN Bus Simulation',
      linDesc: 'Observe master-slave communication of the LIN protocol',
      flexrayTitle: 'FlexRay Simulation',
      flexrayDesc: 'Explore static and dynamic FlexRay cycles',
      ethernetTitle: 'Automotive Ethernet Simulation',
      ethernetDesc: 'Discover high-speed Ethernet communications'
    },
    
    // Digital Twin
    digitalTwin: {
      title: 'Vehicle Digital Twin',
      subtitle: 'Interactive digital twin of a complete automotive network with real-time simulation',
      views: {
        vehicle: 'Vehicle View',
        network: 'Network Topology',
        dashboard: 'Dashboard',
        dataflow: 'Data Flow'
      },
      controls: {
        start: 'Start Simulation',
        stop: 'Stop',
        scenario: 'Scenario'
      },
      scenarios: {
        normal: 'Normal Driving',
        highway: 'Highway',
        city: 'City',
        sport: 'Sport Mode',
        eco: 'Eco Mode',
        emergency: 'Emergency'
      },
      sensors: {
        title: 'Sensors',
        radar: 'Radar',
        lidar: 'LiDAR',
        camera: 'Camera',
        ultrasonic: 'Ultrasonic',
        temperature: 'Temperature',
        pressure: 'Pressure',
        speed: 'Speed',
        rpm: 'Engine RPM',
        fuel: 'Fuel',
        battery: 'Battery'
      },
      ecus: {
        title: 'ECUs',
        engine: 'Engine',
        transmission: 'Transmission',
        brakes: 'Brakes',
        steering: 'Steering',
        airbag: 'Airbag',
        climate: 'Climate',
        infotainment: 'Infotainment',
        adas: 'ADAS',
        body: 'Body',
        gateway: 'Gateway'
      },
      network: {
        title: 'Network',
        canBus: 'CAN Bus',
        linBus: 'LIN Bus',
        flexray: 'FlexRay',
        ethernet: 'Ethernet',
        messages: 'Messages',
        bandwidth: 'Bandwidth',
        load: 'Load',
        errors: 'Errors',
        breakdown: 'Protocol Breakdown'
      },
      dashboard: {
        speed: 'Speed',
        rpm: 'RPM',
        fuel: 'Fuel',
        temperature: 'Temperature',
        battery: 'Battery',
        gear: 'Gear'
      },
      alerts: {
        title: 'System Alerts',
        critical: 'Critical',
        warning: 'Warning',
        info: 'Information',
        noAlerts: 'No alerts - System nominal'
      },
      stats: {
        totalData: 'Data Transmitted',
        totalMessages: 'Total Messages',
        networkStatus: 'Network Status',
        criticalAlerts: 'Critical Alerts',
        active: 'ACTIVE',
        stopped: 'STOPPED'
      },
      messageLog: {
        title: 'Message Log',
        time: 'Time',
        protocol: 'Protocol',
        id: 'ID',
        data: 'Data',
        source: 'Source',
        destination: 'Destination'
      }
    },
    
    // Footer
    footer: {
      description: 'Your reference for understanding and mastering modern automotive communication protocols.',
      protocols: 'Protocols',
      resources: 'Resources',
      developer: 'Developer',
      copyright: 'AutoNet Architecture. All rights reserved.',
      platform: 'Complete platform for exploring automotive communication networks.'
    },
    
    // Protocol Detail
    protocolDetail: {
      notFound: 'Protocol not found',
      notFoundDesc: 'The requested protocol does not exist.',
      backHome: 'Back to home',
      backToProtocols: 'Back to protocols',
      year: 'Year',
      standard: 'Standard',
      inventor: 'Inventor',
      technicalCharacteristics: 'Technical Characteristics',
      maxBitrate: 'Maximum Bitrate',
      payloadSize: 'Payload Size',
      topology: 'Topology',
      physicalMedium: 'Physical Medium',
      nodeCount: 'Number of Nodes',
      determinism: 'Determinism',
      frameStructure: 'Frame Structure',
      arbitrationMechanism: 'Arbitration Mechanism',
      arbitrationRules: 'Arbitration Rules',
      arbitrationExample: 'Arbitration Example',
      node: 'Node',
      wins: 'WINS',
      loses: 'LOSES',
      physicalLayer: 'Physical Layer',
      voltageLevels: 'Voltage Levels',
      recessive: 'Recessive',
      dominant: 'Dominant',
      termination: 'Termination',
      errorHandling: 'Error Handling',
      errorCounters: 'Error Counters',
      errorStates: 'Error States',
      applications: 'Applications',
      advantages: 'Advantages',
      disadvantages: 'Disadvantages',
      exploreOther: 'Explore other protocols'
    },
    
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      learnMore: 'Learn More',
      seeMore: 'See More',
      close: 'Close',
      yes: 'Yes',
      no: 'No'
    }
  }
};

export default translations;
