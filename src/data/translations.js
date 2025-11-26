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
      ethernetDesc: 'Découvrez les communications haute vitesse Ethernet',
      // CAN Simulator
      can: {
        title: 'Simulateur d\'Arbitrage CAN',
        subtitle: 'Observez comment les nœuds CAN rivalisent pour l\'accès au bus via l\'arbitrage par priorité',
        startArbitration: 'Démarrer l\'Arbitrage',
        arbitrating: 'Arbitrage en cours...',
        busIdle: 'BUS EN ATTENTE',
        arbitrationBit: 'ARBITRAGE (Bit {current}/11)',
        transmittingState: 'TRANSMISSION',
        nodeIdle: 'En attente',
        nodeCompeting: 'En compétition',
        nodeLost: 'Perdu',
        nodeTransmitting: 'Transmission',
        nodeWaiting: 'En attente',
        winner: 'GAGNANT',
        transmittedMessage: 'Message Transmis :',
        eventLog: 'Journal des Événements',
        howItWorks: 'Comment fonctionne l\'Arbitrage CAN',
        nonDestructive: 'Non-destructif : Tous les nœuds peuvent transmettre simultanément sans perte de données',
        dominantRecessive: 'Dominant (0) vs Récessif (1) : Quand les nœuds envoient des bits différents, 0 gagne',
        lowerIdPriority: 'ID bas = Priorité haute : Le nœud avec l\'ID le plus bas gagne l\'arbitrage',
        csmacd: 'CSMA/CD+AMP : Accès Multiple avec Détection de Collision et Arbitrage sur Priorité de Message',
        engineEcu: 'ECU Moteur',
        brakeEcu: 'ECU Freinage',
        airbagEcu: 'ECU Airbag',
        bodyEcu: 'ECU Carrosserie'
      },
      // LIN Simulator
      lin: {
        title: 'Simulateur LIN Bus',
        subtitle: 'Communication Maître-Esclave avec interrogation programmée',
        runSchedule: 'Exécuter le Programme',
        runningSchedule: 'Programme en cours...',
        masterEcu: 'ECU Maître',
        windowMotor: 'Moteur de Vitre',
        mirrorControl: 'Contrôle Rétroviseur',
        seatHeater: 'Chauffage Siège',
        rainSensor: 'Capteur de Pluie',
        currentSchedule: 'Programme Actuel',
        communicationLog: 'Journal de Communication',
        howItWorks: 'Comment fonctionne le LIN Bus',
        masterSlave: 'Maître-Esclave : Un seul maître contrôle tout le timing de communication',
        scheduleTable: 'Table de Programme : Séquence prédéfinie de PIDs à interroger',
        frameStructure: 'Structure de Trame : SYNC (0x55) + PID + Données + Checksum',
        lowCost: 'Faible Coût : Un seul fil, 20 kbit/s, pour les sous-systèmes non critiques'
      },
      // FlexRay Simulator
      flexray: {
        title: 'Simulateur FlexRay',
        subtitle: 'Communication déclenchée par le temps avec segments statiques et dynamiques',
        startFlexRay: 'Démarrer FlexRay',
        running: 'En cours...',
        staticSegment: 'Segment Statique',
        dynamicSegment: 'Dynamique',
        symbolWindow: 'FT',
        nit: 'TRI',
        staticSlots: 'Slots Statiques (TDMA)',
        dynamicSlots: 'Segment Dynamique (FTDMA)',
        steeringEcu: 'ECU Direction',
        brakeEcu: 'ECU Freinage',
        suspensionEcu: 'ECU Suspension',
        engineEcu: 'ECU Moteur',
        diagnostic: 'Diagnostic',
        configUpdate: 'Mise à jour Config',
        flexrayLog: 'Journal FlexRay',
        howItWorks: 'Comment fonctionne FlexRay',
        dualChannel: 'Double Canal : Deux canaux indépendants (A & B) pour la redondance',
        tdmaStatic: 'TDMA Statique : Slots temporels garantis pour les données critiques',
        ftdmaDynamic: 'FTDMA Dynamique : Mini-slots flexibles pour les données événementielles',
        highBandwidth: '10 Mbit/s : Haute bande passante pour les applications safety-critical'
      },
      // Ethernet Simulator
      ethernet: {
        title: 'Simulateur Ethernet Automobile',
        subtitle: '100BASE-T1 / 1000BASE-T1 réseau commuté avec VLANs',
        startSimulation: 'Démarrer la Simulation',
        simulating: 'Simulation en cours...',
        packetsSent: 'Paquets Envoyés',
        received: 'Reçus',
        dropped: 'Perdus',
        centralGateway: 'Gateway Central',
        domainSwitchA: 'Switch Domaine A',
        domainSwitchB: 'Switch Domaine B',
        adasCamera: 'Caméra ADAS',
        radarSensor: 'Capteur Radar',
        infotainment: 'Infotainment',
        telematics: 'Télématique',
        obdPort: 'Port OBD',
        ports: 'ports',
        traffic: 'Trafic',
        sending: 'Envoi...',
        receiving: 'Réception...',
        networkLog: 'Journal Réseau',
        howItWorks: 'Comment fonctionne l\'Ethernet Automobile',
        baseT1_100: '100BASE-T1 : Paire torsadée unique, 100 Mbps, pour la plupart des ECUs',
        baseT1_1000: '1000BASE-T1 : Paire torsadée unique, 1 Gbps, pour les caméras/ADAS',
        vlans: 'VLANs : Réseaux virtuels pour l\'isolation du trafic et la sécurité',
        tsn: 'TSN : Time-Sensitive Networking pour une latence déterministe'
      }
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
      platform: 'Plateforme complète pour l\'exploration des réseaux de communication automobile.',
      educational: {
        title: 'But Éducatif',
        purpose: 'Site à Vocation Pédagogique',
        purposeDesc: 'Ce site a été créé pour aider les étudiants, ingénieurs et passionnés à comprendre les protocoles de communication automobile. L\'objectif est de rendre accessible ces technologies complexes à travers des simulations interactives et des explications détaillées.',
        disclaimer: 'Contenu éducatif uniquement - non destiné à un usage commercial ou industriel.'
      }
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
    },
    
    // Protocol Card
    protocolCard: {
      payload: 'Payload',
      topology: 'Topologie',
      exploreDetail: 'Explorer en détail'
    },
    
    // Protocols Data (for cards and detail pages)
    protocols: {
      CAN: {
        description: 'Le protocole CAN est le standard de facto pour les communications embarquées automobiles. Développé par Bosch en 1983 et standardisé en 1986, il permet une communication robuste entre les ECUs.',
        applications: [
          'Gestion moteur (ECM/PCM)',
          'Transmission automatique (TCU)',
          'Système de freinage ABS/ESP'
        ]
      },
      CANFD: {
        description: 'CAN FD est l\'évolution du CAN classique, développée pour répondre aux besoins croissants en bande passante des systèmes ADAS. Il permet des débits jusqu\'à 8 Mbit/s.',
        applications: [
          'ADAS (Systèmes d\'Aide à la Conduite)',
          'Mises à jour firmware OTA',
          'Capteurs haute résolution'
        ]
      },
      LIN: {
        description: 'Le LIN est un protocole de communication série à faible coût, conçu comme complément au CAN pour les applications non critiques. Il utilise une architecture maître-esclave.',
        applications: [
          'Lève-vitres électriques',
          'Rétroviseurs électriques',
          'Commandes de sièges'
        ]
      },
      FlexRay: {
        description: 'FlexRay est un protocole de communication haute performance conçu pour les applications automobiles critiques en termes de sécurité. Il offre un déterminisme garanti.',
        applications: [
          'Direction assistée électrique (EPS)',
          'Suspension active/adaptative',
          'Freinage électronique (Brake-by-Wire)'
        ]
      },
      MOST: {
        description: 'MOST est un protocole optimisé pour le transport de flux multimédia (audio, vidéo) dans les véhicules. Il utilise une topologie en anneau et garantit la bande passante.',
        applications: [
          'Système audio premium/surround',
          'Affichage tête haute (HUD)',
          'Écrans passagers arrière'
        ]
      },
      Ethernet: {
        description: 'L\'Ethernet automobile adapte le standard Ethernet pour les contraintes véhicule : une seule paire torsadée, EMC renforcée, et temps réel via TSN.',
        applications: [
          'Backbone véhicule haute vitesse',
          'Caméras ADAS (surround view)',
          'Radar et LiDAR'
        ]
      },
      topologies: {
        linearBus: 'Bus linéaire',
        masterSlave: 'Maître-Esclave (Bus)',
        busStarHybrid: 'Bus, Étoile, ou Hybride',
        ring: 'Anneau (Ring)',
        star: 'Étoile (Switch central)'
      }
    },
    
    // Digital Twin Network
    digitalTwinNetwork: {
      centralGateway: 'Gateway Central',
      gatewayDesc: 'Point central de routage entre tous les domaines - Gère la sécurité et le filtrage des messages',
      powertrain: {
        name: 'Domaine Powertrain',
        desc: 'Contrôle moteur, transmission, gestion thermique et systèmes de propulsion',
        ecus: {
          ecm: { name: 'ECM', desc: 'Module de Contrôle Moteur' },
          tcu: { name: 'TCU', desc: 'Unité de Contrôle Transmission' },
          fpcm: { name: 'FPCM', desc: 'Module de Contrôle Pompe Carburant' },
          etc: { name: 'ETC', desc: 'Contrôle Électronique Papillon' }
        }
      },
      chassis: {
        name: 'Domaine Châssis',
        desc: 'Systèmes critiques de sécurité active - freinage, direction, suspension',
        ecus: {
          esp: { name: 'ESP', desc: 'Programme de Stabilité Électronique' },
          abs: { name: 'ABS', desc: 'Système Antiblocage des Roues' },
          eps: { name: 'EPS', desc: 'Direction Assistée Électrique' },
          cdc: { name: 'CDC', desc: 'Amortissement Continu Contrôlé' }
        }
      },
      body: {
        name: 'Domaine Carrosserie',
        desc: 'Confort, éclairage, serrures, rétroviseurs et accessoires intérieurs',
        ecus: {
          bcm: { name: 'BCM', desc: 'Module de Contrôle Carrosserie' },
          peps: { name: 'PEPS', desc: 'Entrée/Démarrage Passif' },
          rcm: { name: 'RCM', desc: 'Module Capteur de Pluie' },
          mlm: { name: 'MLM', desc: 'Contrôle Rétroviseur Gauche' }
        }
      },
      infotainment: {
        name: 'Domaine Infotainment',
        desc: 'Système multimédia, navigation, connectivité smartphone et services cloud',
        ecus: {
          hu: { name: 'HU', desc: 'Unité Centrale' },
          tcu: { name: 'TCU', desc: 'Unité de Contrôle Télématique' },
          amp: { name: 'AMP', desc: 'Amplificateur Audio' },
          rse: { name: 'RSE', desc: 'Divertissement Siège Arrière' }
        }
      },
      adas: {
        name: 'Domaine ADAS',
        desc: 'Aide à la conduite, détection obstacles, parking automatique et conduite autonome',
        ecus: {
          adasEcu: { name: 'ADAS ECU', desc: 'Unité de Traitement Central' },
          fwc: { name: 'FWC', desc: 'Caméra Avant' },
          srr: { name: 'SRR', desc: 'Radar Courte Portée' },
          uss: { name: 'USS', desc: 'Capteurs Ultrasoniques' }
        }
      },
      messages: {
        rpm: 'Régime',
        wheelSpeed: 'Vitesse Roue',
        object: 'Objet',
        absActive: 'ABS Actif',
        emergencyBrake: 'Frein Urgence',
        standby: 'En veille',
        telemetry: 'télémétrie',
        safety: 'sécurité',
        sensor: 'capteur',
        status: 'statut',
        media: 'média',
        control: 'contrôle'
      },
      realtimeBus: 'Bus de Messages en Temps Réel'
    },
    
    // Comparison table data
    comparisonData: {
      bitrate: {
        name: 'Débit Maximum',
        desc: 'Vitesse de transmission maximale'
      },
      payload: {
        name: 'Taille Payload',
        desc: 'Quantité maximale de données par trame'
      },
      topology: {
        name: 'Topologie',
        desc: 'Architecture physique du réseau'
      },
      medium: {
        name: 'Support Physique',
        desc: 'Type de câblage utilisé'
      },
      deterministic: {
        name: 'Déterminisme',
        desc: 'Garantie de temps de transmission'
      },
      redundancy: {
        name: 'Redondance',
        desc: 'Support de canaux redondants'
      },
      cost: {
        name: 'Coût',
        desc: 'Coût relatif d\'implémentation'
      },
      year: {
        name: 'Année Introduction',
        desc: 'Année de première utilisation automobile'
      },
      values: {
        linearBus: 'Bus linéaire',
        masterSlaveBus: 'Bus Maître-Esclave',
        busStarHybrid: 'Bus/Étoile/Hybride',
        ring: 'Anneau',
        starSwitch: 'Étoile (Switch)',
        diffWires2: '2 fils différentiels',
        wire1Ground: '1 fil + masse',
        wires2to4: '2 à 4 fils',
        fiberCoax: 'Fibre optique/Coax',
        twistedPair: '1 paire torsadée',
        withTDMA: 'Oui (TDMA)',
        withTSN: 'Avec TSN',
        dualChannel: 'Oui (Double canal)',
        ringBypass: 'Bypass anneau',
        possible802: 'Possible (802.1CB)',
        veryLow: 'Très faible',
        low: 'Faible',
        lowMedium: 'Faible-Moyen',
        medium: 'Moyen',
        mediumDecreasing: 'Moyen (en baisse)',
        high: 'Élevé',
        bytes: 'octets',
        variable: 'Variable'
      },
      useCases: {
        safetyCritical: {
          name: 'Applications Safety-Critical',
          desc: 'Systèmes où une défaillance met en danger la vie',
          examples: ['Brake-by-Wire', 'Steer-by-Wire', 'Airbags']
        },
        powertrain: {
          name: 'Powertrain',
          desc: 'Gestion moteur et transmission',
          examples: ['ECU Moteur', 'Transmission', 'Gestion batterie VE']
        },
        comfort: {
          name: 'Confort / Carrosserie',
          desc: 'Fonctions de confort non critiques',
          examples: ['Vitres', 'Sièges', 'Climatisation', 'Éclairage']
        },
        infotainment: {
          name: 'Infotainment',
          desc: 'Multimédia et connectivité',
          examples: ['Audio', 'Navigation', 'Écrans', 'Téléphone']
        },
        adas: {
          name: 'ADAS',
          desc: 'Aide à la conduite avancée',
          examples: ['Caméras', 'Radar', 'LiDAR', 'Fusion capteurs']
        }
      }
    },
    
    // Protocol Detail Data (full translations for protocol pages)
    protocolsDetailData: {
      CAN: {
        description: 'Le protocole CAN est le standard de facto pour les communications embarquées automobiles. Développé par Bosch en 1983 et standardisé en 1986, il permet une communication robuste entre les ECUs via un bus différentiel à deux fils.',
        topology: 'Bus linéaire',
        medium: '2 fils différentiels (CAN_H, CAN_L)',
        maxNodes: '32 (pratique) - 127 (théorique)',
        accessMethod: 'CSMA/CD + Arbitrage non-destructif',
        arbitration: {
          method: 'Bit-à-bit non-destructif',
          description: 'Lorsque plusieurs nœuds tentent de transmettre simultanément, l\'arbitrage se fait bit par bit. Le bit dominant (0) gagne sur le bit récessif (1). Le message avec l\'identifiant le plus bas (priorité haute) gagne l\'accès au bus.',
          rules: [
            'Un bit dominant (0) écrase un bit récessif (1)',
            'L\'identifiant le plus petit a la priorité la plus haute',
            'Le nœud perdant l\'arbitrage devient récepteur',
            'Aucune perte de temps - transmission immédiate du gagnant'
          ],
          explanation: 'Le nœud C gagne car son ID (0x080) est le plus petit'
        },
        physicalLayer: {
          description: 'Le bus utilise deux fils différentiels. L\'état récessif (1) correspond à une tension égale sur les deux fils. L\'état dominant (0) crée une différence de tension de 2V.',
          termination: '120Ω aux deux extrémités du bus'
        },
        errorHandling: {
          mechanisms: [
            { name: 'Bit Error', description: 'Le transmetteur compare le bit envoyé avec le bit lu sur le bus' },
            { name: 'Stuff Error', description: 'Après 5 bits identiques consécutifs, un bit de stuffing opposé doit être présent' },
            { name: 'CRC Error', description: 'Vérification de l\'intégrité des données via CRC-15' },
            { name: 'Form Error', description: 'Vérification des champs à format fixe (delimiters, EOF)' },
            { name: 'ACK Error', description: 'Au moins un récepteur doit acquitter la trame' }
          ],
          TEC: 'Transmit Error Counter',
          REC: 'Receive Error Counter'
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
        description: 'CAN FD est l\'évolution du CAN classique, développée pour répondre aux besoins croissants en bande passante des systèmes ADAS. Il permet des débits jusqu\'à 8 Mbit/s et des payloads jusqu\'à 64 octets.',
        topology: 'Bus linéaire',
        medium: '2 fils différentiels',
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
        description: 'Le LIN est un protocole de communication série à faible coût, conçu comme complément au CAN pour les applications non critiques. Il utilise une architecture maître-esclave sur un seul fil.',
        topology: 'Maître-Esclave (Bus)',
        medium: '1 fil + masse',
        maxNodes: '1 Maître + 16 Esclaves',
        accessMethod: 'Polling par le maître',
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
        description: 'FlexRay est un protocole de communication haute performance conçu pour les applications automobiles critiques en termes de sécurité. Il offre un déterminisme garanti et une redondance optionnelle via double canal.',
        topology: 'Bus, Étoile, ou Hybride',
        medium: '2 fils par canal (2 ou 4 fils total)',
        maxNodes: '64 par segment',
        accessMethod: 'TDMA (statique) + FTDMA (dynamique)',
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
        description: 'MOST est un protocole optimisé pour le transport de flux multimédia (audio, vidéo) dans les véhicules. Il utilise une topologie en anneau et garantit la bande passante pour le streaming.',
        topology: 'Anneau (Ring)',
        medium: 'Fibre optique plastique (POF) ou Coaxial',
        maxNodes: '64',
        accessMethod: 'TDMA synchrone + Asynchrone',
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
        description: 'L\'Ethernet automobile adapte le standard Ethernet pour les contraintes véhicule : une seule paire torsadée, EMC renforcée, et temps réel via TSN. C\'est l\'avenir des réseaux véhicule.',
        topology: 'Étoile (Switch central)',
        medium: '1 paire torsadée non blindée (UTP)',
        accessMethod: 'CSMA/CD ou Full-Duplex',
        applications: [
          'Backbone véhicule haute vitesse',
          'Caméras ADAS (surround view)',
          'Radar et LiDAR',
          'Infotainment connecté',
          'Diagnostic rapide (DoIP)',
          'Mises à jour OTA',
          'Vehicle-to-Everything (V2X)'
        ],
        advantages: [
          'Très haute bande passante (jusqu\'à 10 Gbit/s)',
          'Écosystème IP mature',
          'Support natif TCP/IP',
          'Coût en baisse',
          'Mises à jour OTA faciles',
          'Unifie diagnostic, infotainment et ADAS'
        ],
        disadvantages: [
          'Complexité de configuration',
          'Nécessite TSN pour temps réel',
          'Cybersécurité critique',
          'Transition depuis protocoles legacy'
        ]
      }
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
      ethernetDesc: 'Discover high-speed Ethernet communications',
      // CAN Simulator
      can: {
        title: 'CAN Bus Arbitration Simulator',
        subtitle: 'Watch how CAN nodes compete for bus access using priority-based arbitration',
        startArbitration: 'Start Arbitration',
        arbitrating: 'Arbitrating...',
        busIdle: 'BUS IDLE',
        arbitrationBit: 'ARBITRATING (Bit {current}/11)',
        transmittingState: 'TRANSMITTING',
        nodeIdle: 'Idle',
        nodeCompeting: 'Competing',
        nodeLost: 'Lost',
        nodeTransmitting: 'Transmitting',
        nodeWaiting: 'Waiting',
        winner: 'WINNER',
        transmittedMessage: 'Transmitted Message:',
        eventLog: 'Event Log',
        howItWorks: 'How CAN Arbitration Works',
        nonDestructive: 'Non-destructive: All nodes can transmit simultaneously without data loss',
        dominantRecessive: 'Dominant (0) vs Recessive (1): When nodes send different bits, 0 wins',
        lowerIdPriority: 'Lower ID = Higher Priority: Node with lowest ID wins arbitration',
        csmacd: 'CSMA/CD+AMP: Carrier Sense Multiple Access with Collision Detection and Arbitration on Message Priority',
        engineEcu: 'Engine ECU',
        brakeEcu: 'Brake ECU',
        airbagEcu: 'Airbag ECU',
        bodyEcu: 'Body ECU'
      },
      // LIN Simulator
      lin: {
        title: 'LIN Bus Simulator',
        subtitle: 'Master-Slave communication with scheduled polling',
        runSchedule: 'Run Schedule',
        runningSchedule: 'Running Schedule...',
        masterEcu: 'Master ECU',
        windowMotor: 'Window Motor',
        mirrorControl: 'Mirror Control',
        seatHeater: 'Seat Heater',
        rainSensor: 'Rain Sensor',
        currentSchedule: 'Current Schedule',
        communicationLog: 'Communication Log',
        howItWorks: 'How LIN Bus Works',
        masterSlave: 'Master-Slave: Single master controls all communication timing',
        scheduleTable: 'Schedule Table: Pre-defined sequence of PIDs to poll',
        frameStructure: 'Frame Structure: SYNC (0x55) + PID + Data + Checksum',
        lowCost: 'Low Cost: Single wire, 20 kbit/s, for non-critical subsystems'
      },
      // FlexRay Simulator
      flexray: {
        title: 'FlexRay Simulator',
        subtitle: 'Time-triggered communication with static and dynamic segments',
        startFlexRay: 'Start FlexRay',
        running: 'Running...',
        staticSegment: 'Static Segment',
        dynamicSegment: 'Dynamic',
        symbolWindow: 'SW',
        nit: 'NIT',
        staticSlots: 'Static Slots (TDMA)',
        dynamicSlots: 'Dynamic Segment (FTDMA)',
        steeringEcu: 'Steering ECU',
        brakeEcu: 'Brake ECU',
        suspensionEcu: 'Suspension ECU',
        engineEcu: 'Engine ECU',
        diagnostic: 'Diagnostic',
        configUpdate: 'Config Update',
        flexrayLog: 'FlexRay Log',
        howItWorks: 'How FlexRay Works',
        dualChannel: 'Dual Channel: Two independent channels (A & B) for redundancy',
        tdmaStatic: 'TDMA Static: Guaranteed time slots for critical data',
        ftdmaDynamic: 'FTDMA Dynamic: Flexible mini-slots for event-driven data',
        highBandwidth: '10 Mbit/s: High bandwidth for safety-critical applications'
      },
      // Ethernet Simulator
      ethernet: {
        title: 'Automotive Ethernet Simulator',
        subtitle: '100BASE-T1 / 1000BASE-T1 switched network with VLANs',
        startSimulation: 'Start Simulation',
        simulating: 'Simulating...',
        packetsSent: 'Packets Sent',
        received: 'Received',
        dropped: 'Dropped',
        centralGateway: 'Central Gateway',
        domainSwitchA: 'Domain Switch A',
        domainSwitchB: 'Domain Switch B',
        adasCamera: 'ADAS Camera',
        radarSensor: 'Radar Sensor',
        infotainment: 'Infotainment',
        telematics: 'Telematics',
        obdPort: 'OBD Port',
        ports: 'ports',
        traffic: 'Traffic',
        sending: 'Sending...',
        receiving: 'Receiving...',
        networkLog: 'Network Log',
        howItWorks: 'How Automotive Ethernet Works',
        baseT1_100: '100BASE-T1: Single twisted pair, 100 Mbps, for most ECUs',
        baseT1_1000: '1000BASE-T1: Single twisted pair, 1 Gbps, for cameras/ADAS',
        vlans: 'VLANs: Virtual networks for traffic isolation and security',
        tsn: 'TSN: Time-Sensitive Networking for deterministic latency'
      }
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
      platform: 'Complete platform for exploring automotive communication networks.',
      educational: {
        title: 'About',
        purpose: 'Educational Purpose',
        purposeDesc: 'This site is designed for educational purposes to help students, engineers and enthusiasts understand communication protocols used in the automotive industry.',
        disclaimer: 'The information presented is simplified for learning purposes. For professional use, please consult official specifications.'
      }
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
    },
    
    // Protocol Card
    protocolCard: {
      payload: 'Payload',
      topology: 'Topology',
      exploreDetail: 'Explore in detail'
    },
    
    // Protocols Data (for cards and detail pages)
    protocols: {
      CAN: {
        description: 'The CAN protocol is the de facto standard for automotive embedded communications. Developed by Bosch in 1983 and standardized in 1986, it enables robust communication between ECUs.',
        applications: [
          'Engine Management (ECM/PCM)',
          'Automatic Transmission (TCU)',
          'ABS/ESP Braking System'
        ]
      },
      CANFD: {
        description: 'CAN FD is the evolution of classic CAN, developed to meet the growing bandwidth needs of ADAS systems. It allows speeds up to 8 Mbit/s.',
        applications: [
          'ADAS (Advanced Driver Assistance Systems)',
          'OTA Firmware Updates',
          'High Resolution Sensors'
        ]
      },
      LIN: {
        description: 'LIN is a low-cost serial communication protocol, designed as a complement to CAN for non-critical applications. It uses a master-slave architecture.',
        applications: [
          'Electric Windows',
          'Electric Mirrors',
          'Seat Controls'
        ]
      },
      FlexRay: {
        description: 'FlexRay is a high-performance communication protocol designed for safety-critical automotive applications. It offers guaranteed determinism.',
        applications: [
          'Electric Power Steering (EPS)',
          'Active/Adaptive Suspension',
          'Electronic Braking (Brake-by-Wire)'
        ]
      },
      MOST: {
        description: 'MOST is a protocol optimized for multimedia streaming (audio, video) in vehicles. It uses a ring topology and guarantees bandwidth.',
        applications: [
          'Premium/Surround Audio System',
          'Head-Up Display (HUD)',
          'Rear Passenger Screens'
        ]
      },
      Ethernet: {
        description: 'Automotive Ethernet adapts the Ethernet standard for vehicle constraints: single twisted pair, enhanced EMC, and real-time via TSN.',
        applications: [
          'High-Speed Vehicle Backbone',
          'ADAS Cameras (Surround View)',
          'Radar and LiDAR'
        ]
      },
      topologies: {
        linearBus: 'Linear Bus',
        masterSlave: 'Master-Slave (Bus)',
        busStarHybrid: 'Bus, Star, or Hybrid',
        ring: 'Ring',
        star: 'Star (Central Switch)'
      }
    },
    
    // Digital Twin Network
    digitalTwinNetwork: {
      centralGateway: 'Central Gateway',
      gatewayDesc: 'Central routing point between all domains - Manages security and message filtering',
      powertrain: {
        name: 'Powertrain Domain',
        desc: 'Engine control, transmission, thermal management and propulsion systems',
        ecus: {
          ecm: { name: 'ECM', desc: 'Engine Control Module' },
          tcu: { name: 'TCU', desc: 'Transmission Control Unit' },
          fpcm: { name: 'FPCM', desc: 'Fuel Pump Control Module' },
          etc: { name: 'ETC', desc: 'Electronic Throttle Control' }
        }
      },
      chassis: {
        name: 'Chassis Domain',
        desc: 'Active safety critical systems - braking, steering, suspension',
        ecus: {
          esp: { name: 'ESP', desc: 'Electronic Stability Program' },
          abs: { name: 'ABS', desc: 'Anti-lock Braking System' },
          eps: { name: 'EPS', desc: 'Electric Power Steering' },
          cdc: { name: 'CDC', desc: 'Continuous Damping Control' }
        }
      },
      body: {
        name: 'Body Domain',
        desc: 'Comfort, lighting, locks, mirrors and interior accessories',
        ecus: {
          bcm: { name: 'BCM', desc: 'Body Control Module' },
          peps: { name: 'PEPS', desc: 'Passive Entry/Start' },
          rcm: { name: 'RCM', desc: 'Rain Sensor Module' },
          mlm: { name: 'MLM', desc: 'Mirror Control Left' }
        }
      },
      infotainment: {
        name: 'Infotainment Domain',
        desc: 'Multimedia system, navigation, smartphone connectivity and cloud services',
        ecus: {
          hu: { name: 'HU', desc: 'Head Unit' },
          tcu: { name: 'TCU', desc: 'Telematics Control Unit' },
          amp: { name: 'AMP', desc: 'Audio Amplifier' },
          rse: { name: 'RSE', desc: 'Rear Seat Entertainment' }
        }
      },
      adas: {
        name: 'ADAS Domain',
        desc: 'Driver assistance, obstacle detection, automatic parking and autonomous driving',
        ecus: {
          adasEcu: { name: 'ADAS ECU', desc: 'Central Processing Unit' },
          fwc: { name: 'FWC', desc: 'Front Camera' },
          srr: { name: 'SRR', desc: 'Short Range Radar' },
          uss: { name: 'USS', desc: 'Ultrasonic Sensors' }
        }
      },
      messages: {
        rpm: 'RPM',
        wheelSpeed: 'Wheel Speed',
        object: 'Object',
        absActive: 'ABS Active',
        emergencyBrake: 'Emergency Brake',
        standby: 'Standby',
        telemetry: 'telemetry',
        safety: 'safety',
        sensor: 'sensor',
        status: 'status',
        media: 'media',
        control: 'control'
      },
      realtimeBus: 'Real-Time Message Bus'
    },
    
    // Comparison table data
    comparisonData: {
      bitrate: {
        name: 'Maximum Bitrate',
        desc: 'Maximum transmission speed'
      },
      payload: {
        name: 'Payload Size',
        desc: 'Maximum data per frame'
      },
      topology: {
        name: 'Topology',
        desc: 'Physical network architecture'
      },
      medium: {
        name: 'Physical Medium',
        desc: 'Type of cabling used'
      },
      deterministic: {
        name: 'Determinism',
        desc: 'Guaranteed transmission time'
      },
      redundancy: {
        name: 'Redundancy',
        desc: 'Redundant channel support'
      },
      cost: {
        name: 'Cost',
        desc: 'Relative implementation cost'
      },
      year: {
        name: 'Introduction Year',
        desc: 'Year of first automotive use'
      },
      values: {
        linearBus: 'Linear Bus',
        masterSlaveBus: 'Master-Slave Bus',
        busStarHybrid: 'Bus/Star/Hybrid',
        ring: 'Ring',
        starSwitch: 'Star (Switch)',
        diffWires2: '2 differential wires',
        wire1Ground: '1 wire + ground',
        wires2to4: '2 to 4 wires',
        fiberCoax: 'Fiber optic/Coax',
        twistedPair: '1 twisted pair',
        withTDMA: 'Yes (TDMA)',
        withTSN: 'With TSN',
        dualChannel: 'Yes (Dual channel)',
        ringBypass: 'Ring bypass',
        possible802: 'Possible (802.1CB)',
        veryLow: 'Very low',
        low: 'Low',
        lowMedium: 'Low-Medium',
        medium: 'Medium',
        mediumDecreasing: 'Medium (decreasing)',
        high: 'High',
        bytes: 'bytes',
        variable: 'Variable'
      },
      useCases: {
        safetyCritical: {
          name: 'Safety-Critical Applications',
          desc: 'Systems where failure endangers life',
          examples: ['Brake-by-Wire', 'Steer-by-Wire', 'Airbags']
        },
        powertrain: {
          name: 'Powertrain',
          desc: 'Engine and transmission management',
          examples: ['Engine ECU', 'Transmission', 'EV Battery Management']
        },
        comfort: {
          name: 'Comfort / Body',
          desc: 'Non-critical comfort functions',
          examples: ['Windows', 'Seats', 'Climate Control', 'Lighting']
        },
        infotainment: {
          name: 'Infotainment',
          desc: 'Multimedia and connectivity',
          examples: ['Audio', 'Navigation', 'Displays', 'Phone']
        },
        adas: {
          name: 'ADAS',
          desc: 'Advanced driver assistance',
          examples: ['Cameras', 'Radar', 'LiDAR', 'Sensor Fusion']
        }
      }
    },
    
    // Protocol Detail Data (full translations for protocol pages)
    protocolsDetailData: {
      CAN: {
        description: 'The CAN protocol is the de facto standard for automotive embedded communications. Developed by Bosch in 1983 and standardized in 1986, it enables robust communication between ECUs via a differential two-wire bus.',
        topology: 'Linear Bus',
        medium: '2 differential wires (CAN_H, CAN_L)',
        maxNodes: '32 (practical) - 127 (theoretical)',
        accessMethod: 'CSMA/CD + Non-destructive arbitration',
        arbitration: {
          method: 'Bit-by-bit non-destructive',
          description: 'When multiple nodes attempt to transmit simultaneously, arbitration is done bit by bit. The dominant bit (0) wins over the recessive bit (1). The message with the lowest identifier (highest priority) wins bus access.',
          rules: [
            'A dominant bit (0) overwrites a recessive bit (1)',
            'The smallest identifier has the highest priority',
            'The losing node becomes a receiver',
            'No time loss - immediate transmission by the winner'
          ],
          explanation: 'Node C wins because its ID (0x080) is the smallest'
        },
        physicalLayer: {
          description: 'The bus uses two differential wires. The recessive state (1) corresponds to equal voltage on both wires. The dominant state (0) creates a 2V voltage difference.',
          termination: '120Ω at both ends of the bus'
        },
        errorHandling: {
          mechanisms: [
            { name: 'Bit Error', description: 'The transmitter compares the sent bit with the bit read on the bus' },
            { name: 'Stuff Error', description: 'After 5 identical consecutive bits, an opposite stuffing bit must be present' },
            { name: 'CRC Error', description: 'Data integrity verification via CRC-15' },
            { name: 'Form Error', description: 'Verification of fixed-format fields (delimiters, EOF)' },
            { name: 'ACK Error', description: 'At least one receiver must acknowledge the frame' }
          ],
          TEC: 'Transmit Error Counter',
          REC: 'Receive Error Counter'
        },
        applications: [
          'Engine Management (ECM/PCM)',
          'Automatic Transmission (TCU)',
          'ABS/ESP Braking System',
          'Airbags and Passive Safety',
          'Dashboard and Instrumentation',
          'Power Steering',
          'Climate Control'
        ],
        advantages: [
          'Robust and reliable',
          'Low cost',
          'Built-in error detection and handling',
          'Wide industry support',
          'Efficient arbitration'
        ],
        disadvantages: [
          'Limited to 1 Mbit/s',
          'Payload limited to 8 bytes',
          'Non-deterministic',
          'Variable latency depending on load'
        ]
      },
      CANFD: {
        description: 'CAN FD is the evolution of classic CAN, developed to meet the growing bandwidth needs of ADAS systems. It allows speeds up to 8 Mbit/s and payloads up to 64 bytes.',
        topology: 'Linear Bus',
        medium: '2 differential wires',
        applications: [
          'ADAS (Advanced Driver Assistance Systems)',
          'OTA Firmware Updates',
          'High Resolution Sensors',
          'Calibration Data Transmission',
          'Advanced Diagnostics'
        ],
        advantages: [
          'Backward compatible with classic CAN',
          '8x higher speed',
          '8x larger payload',
          'Better bus efficiency',
          'Improved CRC'
        ],
        disadvantages: [
          'Requires compatible controllers',
          'Slightly higher cost',
          'Still non-deterministic'
        ]
      },
      LIN: {
        description: 'LIN is a low-cost serial communication protocol, designed as a complement to CAN for non-critical applications. It uses a master-slave architecture on a single wire.',
        topology: 'Master-Slave (Bus)',
        medium: '1 wire + ground',
        maxNodes: '1 Master + 16 Slaves',
        accessMethod: 'Polling by master',
        applications: [
          'Electric Windows',
          'Electric Mirrors',
          'Seat Controls',
          'Rain and Light Sensors',
          'Climate Control (commands)',
          'Sunroof',
          'Interior Lighting'
        ],
        advantages: [
          'Very low cost (single wire)',
          'Simple to implement',
          'Self-synchronization',
          'Deterministic (fixed scheduling)',
          'Ideal for simple sensors/actuators'
        ],
        disadvantages: [
          'Very limited speed (20 kbit/s)',
          'Not suitable for critical applications',
          'Latency depends on scheduling',
          'No collision detection'
        ]
      },
      FlexRay: {
        description: 'FlexRay is a high-performance communication protocol designed for safety-critical automotive applications. It offers guaranteed determinism and optional redundancy via dual channel.',
        topology: 'Bus, Star, or Hybrid',
        medium: '2 wires per channel (2 or 4 wires total)',
        maxNodes: '64 per segment',
        accessMethod: 'TDMA (static) + FTDMA (dynamic)',
        applications: [
          'Electric Power Steering (EPS)',
          'Active/Adaptive Suspension',
          'Electronic Braking (Brake-by-Wire)',
          'Electronic Steering (Steer-by-Wire)',
          'Active Chassis',
          'X-by-Wire Systems'
        ],
        advantages: [
          'Guaranteed determinism (TDMA)',
          'High bandwidth (10-20 Mbit/s)',
          'Built-in redundancy',
          'Fault tolerance',
          'Precise synchronization'
        ],
        disadvantages: [
          'High cost',
          'Configuration complexity',
          'Static configuration required',
          'Being progressively replaced by Ethernet TSN'
        ]
      },
      MOST: {
        description: 'MOST is a protocol optimized for multimedia streaming (audio, video) in vehicles. It uses a ring topology and guarantees bandwidth for streaming.',
        topology: 'Ring',
        medium: 'Plastic Optical Fiber (POF) or Coaxial',
        maxNodes: '64',
        accessMethod: 'Synchronous TDMA + Asynchronous',
        applications: [
          'Premium/Surround Audio System',
          'Head-Up Display (HUD)',
          'Rear Passenger Screens',
          'Backup Camera',
          'Navigation System',
          'Bluetooth/Phone Connectivity',
          'Infotainment'
        ],
        advantages: [
          'Optimized for multimedia',
          'Guaranteed QoS for streaming',
          'Fiber optic = EMI immunity',
          'Plug and play',
          'High bandwidth'
        ],
        disadvantages: [
          'Fiber optic cost',
          'Sensitive connectors',
          'Being replaced by Automotive Ethernet',
          'Specific to infotainment'
        ]
      },
      Ethernet: {
        description: 'Automotive Ethernet adapts the Ethernet standard for vehicle constraints: single twisted pair, enhanced EMC, and real-time via TSN. It is the future of vehicle networks.',
        topology: 'Star (Central Switch)',
        medium: '1 unshielded twisted pair (UTP)',
        accessMethod: 'CSMA/CD or Full-Duplex',
        applications: [
          'High-Speed Vehicle Backbone',
          'ADAS Cameras (Surround View)',
          'Radar and LiDAR',
          'Connected Infotainment',
          'Fast Diagnostics (DoIP)',
          'OTA Updates',
          'Vehicle-to-Everything (V2X)'
        ],
        advantages: [
          'Very high bandwidth (up to 10 Gbit/s)',
          'Mature IP ecosystem',
          'Native TCP/IP support',
          'Decreasing cost',
          'Easy OTA updates',
          'Unifies diagnostics, infotainment and ADAS'
        ],
        disadvantages: [
          'Configuration complexity',
          'Requires TSN for real-time',
          'Critical cybersecurity',
          'Transition from legacy protocols'
        ]
      }
    }
  }
};

export default translations;
