// ============================================
// AUTOMOTIVE NETWORK PROTOCOLS - COMPLETE DATA
// ============================================

export const protocols = {
  CAN: {
    id: 'can',
    name: 'CAN',
    fullName: 'Controller Area Network',
    color: '#ff6b35',
    year: 1986,
    inventor: 'Robert Bosch GmbH',
    standard: 'ISO 11898',
    description: 'Le protocole CAN est le standard de facto pour les communications embarquées automobiles. Développé par Bosch en 1983 et standardisé en 1986, il permet une communication robuste entre les ECUs via un bus différentiel à deux fils.',
    
    characteristics: {
      maxBitrate: '1 Mbit/s',
      maxPayload: '8 octets',
      topology: 'Bus linéaire',
      medium: '2 fils différentiels (CAN_H, CAN_L)',
      maxNodes: '32 (pratique) - 127 (théorique)',
      maxLength: '40m à 1Mbit/s, 1km à 50kbit/s',
      accessMethod: 'CSMA/CD + Arbitrage non-destructif',
      errorDetection: '5 mécanismes',
      deterministic: false,
      redundancy: false
    },
    
    frame: {
      standard: {
        name: 'CAN 2.0A (Standard)',
        totalBits: 108,
        fields: [
          { name: 'SOF', bits: 1, description: 'Start of Frame - Bit dominant marquant le début de trame' },
          { name: 'Identifier', bits: 11, description: 'Identifiant du message (détermine la priorité)' },
          { name: 'RTR', bits: 1, description: 'Remote Transmission Request - Demande de données distante' },
          { name: 'IDE', bits: 1, description: 'Identifier Extension - 0 pour format standard' },
          { name: 'r0', bits: 1, description: 'Bit réservé (dominant)' },
          { name: 'DLC', bits: 4, description: 'Data Length Code - Nombre d\'octets de données (0-8)' },
          { name: 'Data', bits: 64, description: 'Champ de données (0 à 8 octets)' },
          { name: 'CRC', bits: 15, description: 'Cyclic Redundancy Check pour détection d\'erreurs' },
          { name: 'CRC Del', bits: 1, description: 'CRC Delimiter (récessif)' },
          { name: 'ACK', bits: 1, description: 'Acknowledge Slot - Acquittement par les récepteurs' },
          { name: 'ACK Del', bits: 1, description: 'ACK Delimiter (récessif)' },
          { name: 'EOF', bits: 7, description: 'End of Frame - 7 bits récessifs' }
        ]
      },
      extended: {
        name: 'CAN 2.0B (Extended)',
        totalBits: 128,
        identifierBits: 29,
        description: 'Format étendu avec identifiant sur 29 bits pour plus d\'adressage'
      }
    },
    
    arbitration: {
      method: 'Bit-à-bit non-destructif',
      description: 'Lorsque plusieurs nœuds tentent de transmettre simultanément, l\'arbitrage se fait bit par bit. Le bit dominant (0) gagne sur le bit récessif (1). Le message avec l\'identifiant le plus bas (priorité haute) gagne l\'accès au bus.',
      rules: [
        'Un bit dominant (0) écrase un bit récessif (1)',
        'L\'identifiant le plus petit a la priorité la plus haute',
        'Le nœud perdant l\'arbitrage devient récepteur',
        'Aucune perte de temps - transmission immédiate du gagnant'
      ],
      example: {
        nodeA: { id: '0x100', binary: '00100000000', wins: false },
        nodeB: { id: '0x0F0', binary: '00011110000', wins: false },
        nodeC: { id: '0x080', binary: '00010000000', wins: true },
        explanation: 'Le nœud C gagne car son ID (0x080) est le plus petit'
      }
    },
    
    physicalLayer: {
      voltages: {
        recessive: { canH: 2.5, canL: 2.5, differential: 0 },
        dominant: { canH: 3.5, canL: 1.5, differential: 2 }
      },
      termination: '120Ω aux deux extrémités du bus',
      description: 'Le bus utilise deux fils différentiels. L\'état récessif (1) correspond à une tension égale sur les deux fils. L\'état dominant (0) crée une différence de tension de 2V.'
    },
    
    errorHandling: {
      mechanisms: [
        {
          name: 'Bit Error',
          description: 'Le transmetteur compare le bit envoyé avec le bit lu sur le bus'
        },
        {
          name: 'Stuff Error',
          description: 'Après 5 bits identiques consécutifs, un bit de stuffing opposé doit être présent'
        },
        {
          name: 'CRC Error',
          description: 'Vérification de l\'intégrité des données via CRC-15'
        },
        {
          name: 'Form Error',
          description: 'Vérification des champs à format fixe (delimiters, EOF)'
        },
        {
          name: 'ACK Error',
          description: 'Au moins un récepteur doit acquitter la trame'
        }
      ],
      errorCounters: {
        TEC: 'Transmit Error Counter',
        REC: 'Receive Error Counter',
        states: ['Error Active', 'Error Passive', 'Bus Off']
      }
    },
    
    applications: [
      'Gestion moteur (ECM/PCM)',
      'Transmission automatique (TCU)',
      'Système de freinage ABS/ESP',
      'Airbags et sécurité passive',
      'Tableau de bord et instrumentation',
      'Direction assistée',
      'Climatisation'
    ],
    
    advantages: [
      'Robuste et fiable',
      'Coût faible',
      'Détection et gestion d\'erreurs intégrée',
      'Large support industriel',
      'Arbitrage efficace'
    ],
    
    disadvantages: [
      'Débit limité à 1 Mbit/s',
      'Payload limité à 8 octets',
      'Non déterministe',
      'Latence variable selon la charge'
    ]
  },
  
  CANFD: {
    id: 'canfd',
    name: 'CAN FD',
    fullName: 'CAN with Flexible Data-rate',
    color: '#ff8c42',
    year: 2012,
    inventor: 'Robert Bosch GmbH',
    standard: 'ISO 11898-1:2015',
    description: 'CAN FD est l\'évolution du CAN classique, développée pour répondre aux besoins croissants en bande passante des systèmes ADAS. Il permet des débits jusqu\'à 8 Mbit/s et des payloads jusqu\'à 64 octets.',
    
    characteristics: {
      maxBitrate: '8 Mbit/s (phase données)',
      arbitrationBitrate: '1 Mbit/s',
      maxPayload: '64 octets',
      topology: 'Bus linéaire',
      medium: '2 fils différentiels',
      maxNodes: '32 (pratique)',
      accessMethod: 'CSMA/CD + Arbitrage non-destructif',
      deterministic: false,
      redundancy: false,
      efficiency: '~90%'
    },
    
    frame: {
      name: 'Trame CAN FD',
      keyFields: [
        { name: 'FDF', bits: 1, description: 'FD Format - Indique une trame CAN FD (1)' },
        { name: 'BRS', bits: 1, description: 'Bit Rate Switch - Active le changement de débit' },
        { name: 'ESI', bits: 1, description: 'Error State Indicator' }
      ],
      dlcMapping: {
        description: 'Mapping non-linéaire du DLC vers la taille des données',
        values: [
          { dlc: 0, bytes: 0 }, { dlc: 1, bytes: 1 }, { dlc: 2, bytes: 2 },
          { dlc: 3, bytes: 3 }, { dlc: 4, bytes: 4 }, { dlc: 5, bytes: 5 },
          { dlc: 6, bytes: 6 }, { dlc: 7, bytes: 7 }, { dlc: 8, bytes: 8 },
          { dlc: 9, bytes: 12 }, { dlc: 10, bytes: 16 }, { dlc: 11, bytes: 20 },
          { dlc: 12, bytes: 24 }, { dlc: 13, bytes: 32 }, { dlc: 14, bytes: 48 },
          { dlc: 15, bytes: 64 }
        ]
      }
    },
    
    bitrateSwitch: {
      description: 'Le CAN FD utilise deux vitesses de communication différentes',
      arbitrationPhase: {
        bitrate: '1 Mbit/s',
        usage: 'Arbitrage et ACK',
        reason: 'Compatible avec CAN classique et permet l\'arbitrage'
      },
      dataPhase: {
        bitrate: 'Jusqu\'à 8 Mbit/s',
        usage: 'Transmission des données',
        reason: 'Maximise le débit après avoir gagné l\'arbitrage'
      }
    },
    
    improvements: [
      { metric: 'Payload', classic: '8 octets', fd: '64 octets', factor: '8x' },
      { metric: 'Débit données', classic: '1 Mbit/s', fd: '8 Mbit/s', factor: '8x' },
      { metric: 'Efficacité', classic: '~50%', fd: '~90%', factor: '1.8x' },
      { metric: 'CRC', classic: '15 bits', fd: '17-21 bits', factor: 'Meilleur' }
    ],
    
    applications: [
      'ADAS (Advanced Driver Assistance Systems)',
      'Mises à jour firmware OTA',
      'Capteurs haute résolution',
      'Transmission de données de calibration',
      'Diagnostic avancé'
    ],
    
    advantages: [
      'Rétrocompatible avec CAN classique',
      'Débit 8x supérieur',
      'Payload 8x supérieur',
      'Meilleure efficacité du bus',
      'CRC amélioré'
    ],
    
    disadvantages: [
      'Nécessite des contrôleurs compatibles',
      'Coût légèrement supérieur',
      'Toujours non déterministe'
    ]
  },
  
  LIN: {
    id: 'lin',
    name: 'LIN',
    fullName: 'Local Interconnect Network',
    color: '#06d6a0',
    year: 1999,
    inventor: 'Consortium LIN (BMW, VW, Audi, Volvo, Mercedes)',
    standard: 'ISO 17987',
    description: 'Le LIN est un protocole de communication série à faible coût, conçu comme complément au CAN pour les applications non critiques. Il utilise une architecture maître-esclave sur un seul fil.',
    
    characteristics: {
      maxBitrate: '20 kbit/s',
      typicalBitrate: '19.2 kbit/s',
      maxPayload: '8 octets',
      topology: 'Maître-Esclave (Bus)',
      medium: '1 fil + masse',
      maxNodes: '1 Maître + 16 Esclaves',
      accessMethod: 'Polling par le maître',
      deterministic: true,
      redundancy: false,
      cost: 'Très faible'
    },
    
    frame: {
      name: 'Trame LIN',
      structure: [
        { name: 'Break', bits: 13, description: 'Signal de réveil - au moins 13 bits dominants' },
        { name: 'Sync', bits: 8, description: 'Champ de synchronisation (0x55) pour calibrer l\'horloge' },
        { name: 'PID', bits: 8, description: 'Protected Identifier (6 bits ID + 2 bits parité)' },
        { name: 'Data', bits: '8-64', description: '1 à 8 octets de données' },
        { name: 'Checksum', bits: 8, description: 'Somme de contrôle (classique ou enhanced)' }
      ],
      parts: {
        header: 'Envoyé par le Maître (Break + Sync + PID)',
        response: 'Envoyé par l\'Esclave désigné (Data + Checksum)'
      }
    },
    
    communication: {
      description: 'Le maître contrôle entièrement la communication via une table de scheduling',
      process: [
        'Le maître envoie l\'en-tête (Break + Sync + PID)',
        'L\'esclave reconnaît son ID dans le PID',
        'L\'esclave répond avec les données et le checksum',
        'Le maître passe au slot suivant selon le schedule'
      ],
      scheduling: {
        description: 'Table de scheduling définissant l\'ordre et la fréquence des messages',
        example: [
          { slot: 1, id: '0x01', period: '10ms', device: 'Capteur température' },
          { slot: 2, id: '0x02', period: '20ms', device: 'Commande vitre' },
          { slot: 3, id: '0x03', period: '50ms', device: 'Position siège' }
        ]
      }
    },
    
    synchronization: {
      description: 'Les esclaves LIN n\'ont pas besoin de quartz précis',
      method: 'Le champ Sync (0x55 = 01010101) permet aux esclaves de calibrer leur horloge',
      tolerance: '±14% de dérive horloge acceptée'
    },
    
    applications: [
      'Lève-vitres électriques',
      'Rétroviseurs électriques',
      'Commandes de sièges',
      'Capteurs de pluie et lumière',
      'Climatisation (commandes)',
      'Toit ouvrant',
      'Éclairage intérieur'
    ],
    
    advantages: [
      'Coût très faible (un seul fil)',
      'Simple à implémenter',
      'Auto-synchronisation',
      'Déterministe (scheduling fixe)',
      'Idéal pour capteurs/actionneurs simples'
    ],
    
    disadvantages: [
      'Débit très limité (20 kbit/s)',
      'Non adapté aux applications critiques',
      'Latence dépendante du scheduling',
      'Pas de détection de collision'
    ]
  },
  
  FlexRay: {
    id: 'flexray',
    name: 'FlexRay',
    fullName: 'FlexRay',
    color: '#9d4edd',
    year: 2005,
    inventor: 'Consortium FlexRay (BMW, DaimlerChrysler, Philips, Freescale, Bosch)',
    standard: 'ISO 17458',
    description: 'FlexRay est un protocole de communication haute performance conçu pour les applications automobiles critiques en termes de sécurité. Il offre un déterminisme garanti et une redondance optionnelle via double canal.',
    
    characteristics: {
      maxBitrate: '10 Mbit/s par canal',
      totalBitrate: '20 Mbit/s (double canal)',
      maxPayload: '254 octets',
      topology: 'Bus, Étoile, ou Hybride',
      medium: '2 fils par canal (2 ou 4 fils total)',
      maxNodes: '64 par segment',
      accessMethod: 'TDMA (statique) + FTDMA (dynamique)',
      deterministic: true,
      redundancy: true,
      cost: 'Élevé'
    },
    
    cycle: {
      description: 'Le cycle FlexRay est la période fondamentale de communication (1-5 ms typique)',
      segments: [
        {
          name: 'Segment Statique',
          method: 'TDMA (Time Division Multiple Access)',
          description: 'Slots fixes attribués à chaque nœud. Transmission déterministe garantie.',
          usage: 'Données critiques temps réel (sécurité)'
        },
        {
          name: 'Segment Dynamique',
          method: 'FTDMA (Flexible TDMA)',
          description: 'Minislots dynamiques attribués selon la demande.',
          usage: 'Données événementielles non critiques'
        },
        {
          name: 'Symbol Window',
          description: 'Fenêtre optionnelle pour symboles spéciaux',
          usage: 'Wake-up, maintenance'
        },
        {
          name: 'NIT (Network Idle Time)',
          description: 'Période d\'inactivité pour synchronisation',
          usage: 'Correction d\'horloge entre nœuds'
        }
      ]
    },
    
    frame: {
      name: 'Trame FlexRay',
      structure: [
        { name: 'Header', bits: 40, description: '5 octets d\'en-tête' },
        { name: 'Payload', bits: '0-2032', description: '0 à 254 octets de données' },
        { name: 'Trailer', bits: 24, description: 'CRC-24 pour vérification' }
      ],
      headerFields: [
        { name: 'Frame ID', bits: 11, description: 'Identifiant du slot' },
        { name: 'Payload Length', bits: 7, description: 'Longueur des données' },
        { name: 'Header CRC', bits: 11, description: 'CRC de l\'en-tête' },
        { name: 'Cycle Count', bits: 6, description: 'Compteur de cycle' }
      ]
    },
    
    dualChannel: {
      description: 'FlexRay supporte deux canaux indépendants (A et B)',
      modes: [
        {
          name: 'Redondance',
          description: 'Mêmes données sur les deux canaux',
          advantage: 'Tolérance aux pannes maximale',
          usage: 'Applications safety-critical'
        },
        {
          name: 'Indépendant',
          description: 'Données différentes sur chaque canal',
          advantage: 'Débit doublé (20 Mbit/s total)',
          usage: 'Applications haute bande passante'
        }
      ]
    },
    
    synchronization: {
      description: 'Synchronisation distribuée sans maître central',
      precision: '< 1 μs entre nœuds',
      method: 'Algorithme FTM (Fault-Tolerant Midpoint)',
      coldStart: 'Procédure de démarrage à froid avec nœuds de synchronisation'
    },
    
    applications: [
      'Direction assistée électrique (EPS)',
      'Suspension active/adaptative',
      'Freinage électronique (Brake-by-Wire)',
      'Direction électronique (Steer-by-Wire)',
      'Châssis actif',
      'Systèmes X-by-Wire'
    ],
    
    advantages: [
      'Déterminisme garanti (TDMA)',
      'Haute bande passante (10-20 Mbit/s)',
      'Redondance intégrée',
      'Tolérance aux pannes',
      'Synchronisation précise'
    ],
    
    disadvantages: [
      'Coût élevé',
      'Complexité de configuration',
      'Configuration statique requise',
      'Remplacé progressivement par Ethernet TSN'
    ]
  },
  
  MOST: {
    id: 'most',
    name: 'MOST',
    fullName: 'Media Oriented Systems Transport',
    color: '#00d4ff',
    year: 2001,
    inventor: 'MOST Cooperation (BMW, Daimler, Harman, Microchip)',
    standard: 'MOST150',
    description: 'MOST est un protocole optimisé pour le transport de flux multimédia (audio, vidéo) dans les véhicules. Il utilise une topologie en anneau et garantit la bande passante pour le streaming.',
    
    characteristics: {
      maxBitrate: '150 Mbit/s (MOST150)',
      versions: [
        { name: 'MOST25', bitrate: '25 Mbit/s', year: 2001 },
        { name: 'MOST50', bitrate: '50 Mbit/s', year: 2005 },
        { name: 'MOST150', bitrate: '150 Mbit/s', year: 2007 }
      ],
      topology: 'Anneau (Ring)',
      medium: 'Fibre optique plastique (POF) ou Coaxial',
      maxNodes: '64',
      accessMethod: 'TDMA synchrone + Asynchrone',
      deterministic: true,
      redundancy: 'Bypass automatique',
      qos: 'Garantie de bande passante'
    },
    
    frame: {
      name: 'Trame MOST',
      size: '512 bits (64 octets)',
      rate: '44.1 kHz ou 48 kHz',
      channels: [
        {
          name: 'Synchronous Channel',
          description: 'Données streaming (audio/vidéo)',
          characteristic: 'Bande passante garantie, QoS',
          usage: 'Flux audio multicanal, vidéo'
        },
        {
          name: 'Asynchronous Channel',
          description: 'Données paquetisées',
          characteristic: 'Best-effort, type Ethernet',
          usage: 'Téléchargements, contrôle'
        },
        {
          name: 'Control Channel',
          description: 'Messages de contrôle',
          characteristic: 'Faible bande passante',
          usage: 'Configuration, commandes'
        }
      ]
    },
    
    ringTopology: {
      description: 'Les données circulent dans un anneau unidirectionnel',
      features: [
        'Chaque nœud reçoit et retransmet',
        'Timing Master génère les trames',
        'Bypass automatique si un nœud tombe',
        'Immunité EMI grâce à la fibre optique'
      ],
      faultTolerance: 'Si un nœud échoue, le bypass optique maintient l\'anneau'
    },
    
    synchronousStreaming: {
      description: 'Allocation dynamique de canaux synchrones pour le streaming audio',
      example: [
        { channel: 1, usage: 'Audio Avant Gauche', bandwidth: '8 bytes/frame' },
        { channel: 2, usage: 'Audio Avant Droit', bandwidth: '8 bytes/frame' },
        { channel: 3, usage: 'Audio Arrière Gauche', bandwidth: '4 bytes/frame' },
        { channel: 4, usage: 'Audio Arrière Droit', bandwidth: '4 bytes/frame' },
        { channel: 5, usage: 'Subwoofer', bandwidth: '4 bytes/frame' },
        { channel: 6, usage: 'Navigation Voice', bandwidth: '2 bytes/frame' }
      ],
      sampleRates: ['44.1 kHz', '48 kHz', '96 kHz', '192 kHz']
    },
    
    applications: [
      'Système audio premium/surround',
      'Affichage tête haute (HUD)',
      'Écrans passagers arrière',
      'Caméra de recul',
      'Système de navigation',
      'Connectivité Bluetooth/Téléphone',
      'Infotainment'
    ],
    
    advantages: [
      'Optimisé pour le multimédia',
      'QoS garantie pour streaming',
      'Fibre optique = immunité EMI',
      'Plug and play',
      'Haute bande passante'
    ],
    
    disadvantages: [
      'Coût de la fibre optique',
      'Connecteurs sensibles',
      'Remplacé par Automotive Ethernet',
      'Spécifique à l\'infotainment'
    ]
  },
  
  Ethernet: {
    id: 'ethernet',
    name: 'Automotive Ethernet',
    fullName: 'Automotive Ethernet (100BASE-T1 / 1000BASE-T1)',
    color: '#64ffda',
    year: 2015,
    inventor: 'IEEE / Broadcom (BroadR-Reach)',
    standard: 'IEEE 802.3bw (100BASE-T1), IEEE 802.3bp (1000BASE-T1)',
    description: 'L\'Ethernet automobile adapte le standard Ethernet pour les contraintes véhicule : une seule paire torsadée, EMC renforcée, et temps réel via TSN. C\'est l\'avenir des réseaux véhicule.',
    
    characteristics: {
      variants: [
        { name: '10BASE-T1S', bitrate: '10 Mbit/s', pairs: 1, distance: '25m', usage: 'Remplacement CAN' },
        { name: '100BASE-T1', bitrate: '100 Mbit/s', pairs: 1, distance: '15m', usage: 'Caméras, capteurs' },
        { name: '1000BASE-T1', bitrate: '1 Gbit/s', pairs: 1, distance: '15-40m', usage: 'Backbone, ADAS' },
        { name: '2.5/5/10GBASE-T1', bitrate: 'Multi-Gbit', pairs: 1, distance: '15m', usage: 'Conduite autonome' }
      ],
      topology: 'Étoile (Switch central)',
      medium: '1 paire torsadée non blindée (UTP)',
      accessMethod: 'CSMA/CD ou Full-Duplex',
      deterministic: 'Avec TSN (Time-Sensitive Networking)',
      redundancy: 'Possible avec protocoles spécifiques'
    },
    
    advantages: [
      'Très haute bande passante (jusqu\'à 10 Gbit/s)',
      'Écosystème IP mature',
      'Support natif TCP/IP',
      'Coût en baisse',
      'Mises à jour OTA faciles',
      'Unifie diagnostic, infotainment et ADAS'
    ],
    
    protocolStack: {
      layers: [
        { layer: 'Application', protocols: ['SOME/IP', 'DoIP', 'HTTP', 'DDS', 'AVB'] },
        { layer: 'Transport', protocols: ['TCP', 'UDP'] },
        { layer: 'Network', protocols: ['IPv4', 'IPv6', 'ARP'] },
        { layer: 'Data Link', protocols: ['Ethernet MAC', 'AVB', 'TSN'] },
        { layer: 'Physical', protocols: ['100BASE-T1', '1000BASE-T1'] }
      ]
    },
    
    tsn: {
      name: 'Time-Sensitive Networking',
      description: 'Extension IEEE 802.1 pour le temps réel déterministe sur Ethernet',
      standards: [
        { name: '802.1AS', description: 'Synchronisation temporelle (gPTP)', precision: '< 1 μs' },
        { name: '802.1Qbv', description: 'Time-Aware Shaper (TAS)', usage: 'Créneaux temporels réservés' },
        { name: '802.1Qav', description: 'Credit-Based Shaper (CBS)', usage: 'Audio/Video Bridging' },
        { name: '802.1CB', description: 'Frame Replication and Elimination', usage: 'Redondance' }
      ],
      benefit: 'Latence garantie < 100 μs pour trafic critique'
    },
    
    someip: {
      name: 'SOME/IP',
      fullName: 'Scalable service-Oriented MiddlewarE over IP',
      description: 'Middleware service-oriented pour la communication entre ECUs',
      features: [
        'Modèle client-serveur',
        'Découverte de services',
        'Sérialisation des données',
        'Notifications événementielles'
      ]
    },
    
    doip: {
      name: 'DoIP',
      fullName: 'Diagnostics over IP',
      description: 'Transport des messages de diagnostic UDS sur TCP/IP',
      port: 13400,
      usage: 'Diagnostic véhicule via Ethernet (plus rapide que CAN)'
    },
    
    architecture: {
      current: {
        name: 'Domain Architecture',
        description: 'Contrôleurs de domaine reliés par backbone Ethernet',
        domains: ['Powertrain', 'ADAS', 'Body', 'Infotainment']
      },
      future: {
        name: 'Zonal Architecture',
        description: 'Calculateur central + contrôleurs zonaux',
        benefits: ['Réduction du câblage', 'Centralisation du software', 'Mises à jour OTA']
      }
    },
    
    applications: [
      'Backbone véhicule haute vitesse',
      'Caméras ADAS (surround view)',
      'Radar et LiDAR',
      'Infotainment connecté',
      'Diagnostic rapide (DoIP)',
      'Mises à jour OTA',
      'Vehicle-to-Everything (V2X)'
    ],
    
    disadvantages: [
      'Complexité de configuration',
      'Nécessite TSN pour temps réel',
      'Cybersécurité critique',
      'Transition depuis protocoles legacy'
    ]
  }
};

// Données de comparaison entre protocoles
export const comparisonData = {
  criteria: [
    {
      id: 'bitrate',
      name: 'Débit Maximum',
      unit: 'bit/s',
      description: 'Vitesse de transmission maximale',
      values: {
        CAN: { value: 1000000, display: '1 Mbit/s' },
        CANFD: { value: 8000000, display: '8 Mbit/s' },
        LIN: { value: 20000, display: '20 kbit/s' },
        FlexRay: { value: 10000000, display: '10 Mbit/s' },
        MOST: { value: 150000000, display: '150 Mbit/s' },
        Ethernet: { value: 10000000000, display: '10 Gbit/s' }
      }
    },
    {
      id: 'payload',
      name: 'Taille Payload',
      unit: 'octets',
      description: 'Quantité maximale de données par trame',
      values: {
        CAN: { value: 8, display: '8 octets' },
        CANFD: { value: 64, display: '64 octets' },
        LIN: { value: 8, display: '8 octets' },
        FlexRay: { value: 254, display: '254 octets' },
        MOST: { value: 'Variable', display: 'Variable' },
        Ethernet: { value: 1500, display: '1500 octets' }
      }
    },
    {
      id: 'topology',
      name: 'Topologie',
      description: 'Architecture physique du réseau',
      values: {
        CAN: { value: 'Bus', display: 'Bus linéaire' },
        CANFD: { value: 'Bus', display: 'Bus linéaire' },
        LIN: { value: 'Bus', display: 'Bus Maître-Esclave' },
        FlexRay: { value: 'Flexible', display: 'Bus/Étoile/Hybride' },
        MOST: { value: 'Ring', display: 'Anneau' },
        Ethernet: { value: 'Star', display: 'Étoile (Switch)' }
      }
    },
    {
      id: 'medium',
      name: 'Support Physique',
      description: 'Type de câblage utilisé',
      values: {
        CAN: { value: '2 wires', display: '2 fils différentiels' },
        CANFD: { value: '2 wires', display: '2 fils différentiels' },
        LIN: { value: '1 wire', display: '1 fil + masse' },
        FlexRay: { value: '2-4 wires', display: '2 à 4 fils' },
        MOST: { value: 'Fiber', display: 'Fibre optique/Coax' },
        Ethernet: { value: '1 pair', display: '1 paire torsadée' }
      }
    },
    {
      id: 'deterministic',
      name: 'Déterminisme',
      description: 'Garantie de temps de transmission',
      values: {
        CAN: { value: false, display: 'Non' },
        CANFD: { value: false, display: 'Non' },
        LIN: { value: true, display: 'Oui' },
        FlexRay: { value: true, display: 'Oui (TDMA)' },
        MOST: { value: true, display: 'Oui' },
        Ethernet: { value: 'TSN', display: 'Avec TSN' }
      }
    },
    {
      id: 'redundancy',
      name: 'Redondance',
      description: 'Support de canaux redondants',
      values: {
        CAN: { value: false, display: 'Non' },
        CANFD: { value: false, display: 'Non' },
        LIN: { value: false, display: 'Non' },
        FlexRay: { value: true, display: 'Oui (Double canal)' },
        MOST: { value: 'partial', display: 'Bypass anneau' },
        Ethernet: { value: 'possible', display: 'Possible (802.1CB)' }
      }
    },
    {
      id: 'cost',
      name: 'Coût',
      description: 'Coût relatif d\'implémentation',
      values: {
        CAN: { value: 2, display: 'Faible' },
        CANFD: { value: 2.5, display: 'Faible-Moyen' },
        LIN: { value: 1, display: 'Très faible' },
        FlexRay: { value: 5, display: 'Élevé' },
        MOST: { value: 3.5, display: 'Moyen' },
        Ethernet: { value: 3, display: 'Moyen (en baisse)' }
      }
    },
    {
      id: 'year',
      name: 'Année Introduction',
      description: 'Année de première utilisation automobile',
      values: {
        CAN: { value: 1991, display: '1991' },
        CANFD: { value: 2012, display: '2012' },
        LIN: { value: 1999, display: '1999' },
        FlexRay: { value: 2006, display: '2006' },
        MOST: { value: 2001, display: '2001' },
        Ethernet: { value: 2015, display: '2015' }
      }
    }
  ],
  
  useCases: {
    safetyCritical: {
      name: 'Applications Safety-Critical',
      description: 'Systèmes où une défaillance met en danger la vie',
      recommended: ['FlexRay', 'CAN FD', 'Ethernet + TSN'],
      examples: ['Brake-by-Wire', 'Steer-by-Wire', 'Airbags']
    },
    powertrain: {
      name: 'Powertrain',
      description: 'Gestion moteur et transmission',
      recommended: ['CAN', 'CAN FD'],
      examples: ['ECU Moteur', 'Transmission', 'Gestion batterie EV']
    },
    comfort: {
      name: 'Confort / Body',
      description: 'Fonctions de confort non critiques',
      recommended: ['LIN', 'CAN'],
      examples: ['Vitres', 'Sièges', 'Climatisation', 'Éclairage']
    },
    infotainment: {
      name: 'Infotainment',
      description: 'Multimédia et connectivité',
      recommended: ['MOST', 'Ethernet'],
      examples: ['Audio', 'Navigation', 'Écrans', 'Téléphone']
    },
    adas: {
      name: 'ADAS',
      description: 'Aide à la conduite avancée',
      recommended: ['Ethernet', 'CAN FD'],
      examples: ['Caméras', 'Radar', 'LiDAR', 'Fusion capteurs']
    }
  }
};

// Données pour les simulations
export const simulationData = {
  canArbitration: {
    title: 'Simulation d\'Arbitrage CAN',
    description: 'Visualisation du mécanisme d\'arbitrage bit-à-bit non-destructif',
    nodes: [
      { id: 'ECU_Engine', priority: 0x100, name: 'ECU Moteur' },
      { id: 'ECU_ABS', priority: 0x080, name: 'ECU ABS' },
      { id: 'ECU_Transmission', priority: 0x0C0, name: 'ECU Transmission' }
    ]
  },
  
  canFrame: {
    title: 'Transmission de Trame CAN',
    description: 'Visualisation pas-à-pas de l\'envoi d\'une trame CAN',
    steps: [
      { name: 'SOF', description: 'Le nœud vérifie que le bus est libre et envoie le bit de départ' },
      { name: 'Arbitration', description: 'Envoi de l\'identifiant avec arbitrage simultané' },
      { name: 'Control', description: 'RTR, IDE, et DLC définissent le type et la taille' },
      { name: 'Data', description: 'Transmission des 0-8 octets de données' },
      { name: 'CRC', description: 'Envoi du CRC calculé pour vérification' },
      { name: 'ACK', description: 'Les récepteurs acquittent en dominant' },
      { name: 'EOF', description: '7 bits récessifs marquent la fin' }
    ]
  },
  
  linSchedule: {
    title: 'Schedule LIN',
    description: 'Visualisation du scheduling maître-esclave',
    schedule: [
      { slot: 1, id: 0x01, device: 'Capteur Temp', period: 10 },
      { slot: 2, id: 0x02, device: 'Vitre Conducteur', period: 20 },
      { slot: 3, id: 0x01, device: 'Capteur Temp', period: 10 },
      { slot: 4, id: 0x03, device: 'Rétroviseur', period: 50 }
    ]
  },
  
  flexrayCycle: {
    title: 'Cycle FlexRay',
    description: 'Visualisation d\'un cycle de communication FlexRay',
    segments: [
      { name: 'Static Segment', slots: 10, duration: 2000 },
      { name: 'Dynamic Segment', minislots: 20, duration: 1000 },
      { name: 'Symbol Window', duration: 100 },
      { name: 'NIT', duration: 400 }
    ]
  },
  
  vehicleNetwork: {
    title: 'Digital Twin - Réseau Véhicule',
    description: 'Visualisation interactive d\'un réseau véhicule complet',
    domains: [
      {
        name: 'Powertrain',
        protocol: 'CAN FD',
        ecus: ['ECU Moteur', 'Transmission', 'Batterie HV']
      },
      {
        name: 'Chassis',
        protocol: 'FlexRay',
        ecus: ['EPS', 'ABS/ESP', 'Suspension']
      },
      {
        name: 'Body',
        protocol: 'LIN',
        ecus: ['BCM', 'Vitres', 'Sièges', 'Éclairage']
      },
      {
        name: 'Infotainment',
        protocol: 'Ethernet',
        ecus: ['Head Unit', 'Amplificateur', 'Écran Arrière']
      },
      {
        name: 'ADAS',
        protocol: 'Ethernet',
        ecus: ['Caméra Avant', 'Radar', 'ADAS Controller']
      }
    ]
  }
};

export default protocols;
