export const SCENARIO_CONFIGS = {
  CORRECT_TREATMENT: {
    name: "Правильное лечение",
    dosePower: 0.85,
    mutationChance: 0.02,
    reproductionSpeed: 0.8,
    toxicity: 2,
    description: "Бактерии умирают быстрее, чем успевают приспособиться."
  },
  MISSED_DOSE: {
    name: "Пропуск дозы",
    dosePower: 0.30,
    mutationChance: 0.35,
    reproductionSpeed: 1.5,
    toxicity: 0,
    description: "Падение концентрации лекарства вызывает всплеск мутаций."
  },
  EARLY_STOP: {
    name: "Раннее прекращение",
    dosePower: 0.0,
    mutationChance: 0.05,
    reproductionSpeed: 3.0,
    toxicity: 0,
    description: "Выжившие (самые стойкие) стремительно захватывают организм."
  },
  OVERDOSE: {
    name: "Передозировка",
    dosePower: 0.99,
    mutationChance: 0.01,
    reproductionSpeed: 0.2,
    toxicity: 15,
    description: "Инфекция выжжена, но организм пациента критически истощен."
  }
};

export default class BacteriaSimulationEngine {
  constructor() {
    this.MAX_CAPACITY = 2000;
    this.SUPERBUG_THRESHOLD = 0.85;
    this.population = [];
    this.day = 0;
    this.patientHealth = 100;
    this.history = [];
  }

  initInfection(initialCount = 100) {
    this.population = Array.from({ length: initialCount }, () => ({
      id: crypto.randomUUID(),
      resistance: Math.random() * 0.1,
      isSuperbug: false
    }));
  }

  processDay(actionKey) {
    const config = SCENARIO_CONFIGS[actionKey];
    if (!config) throw new Error("Неизвестный сценарий");
    this.day++;

    this.population = this.population.filter(bacteria => {
      const deathProbability = Math.max(0, config.dosePower - bacteria.resistance);
      return Math.random() >= deathProbability;
    });

    const currentSize = this.population.length;
    const spaceAvailable = Math.max(0, this.MAX_CAPACITY - currentSize) / this.MAX_CAPACITY;
    const reproductionChance = config.reproductionSpeed * spaceAvailable;
    const newOffspring = [];

    this.population.forEach(bacteria => {
      if (Math.random() < reproductionChance) {
        let childResistance = bacteria.resistance;
        if (Math.random() < config.mutationChance) {
          childResistance += 0.05 + Math.random() * 0.20;
        }
        childResistance = Math.min(1.0, childResistance);
        newOffspring.push({
          id: crypto.randomUUID(),
          resistance: childResistance,
          isSuperbug: childResistance >= this.SUPERBUG_THRESHOLD
        });
      }
    });

    this.population.push(...newOffspring);
    const infectionDamage = (this.population.length / this.MAX_CAPACITY) * 15;
    this.patientHealth -= (infectionDamage + config.toxicity);

    if (this.population.length < 50 && this.patientHealth < 100) {
      this.patientHealth = Math.min(100, this.patientHealth + 5);
    }

    this.recordStats();
    return this.getStats();
  }

  getStats() {
    let superbugsCount = 0;
    let totalResistance = 0;
    this.population.forEach(b => {
      if (b.isSuperbug) superbugsCount++;
      totalResistance += b.resistance;
    });
    return {
      day: this.day,
      totalBacteria: this.population.length,
      superbugs: superbugsCount,
      normalBacteria: this.population.length - superbugsCount,
      averageResistance: this.population.length ? (totalResistance / this.population.length) : 0,
      health: Math.max(0, Math.floor(this.patientHealth)),
      isGameOver: this.patientHealth <= 0 || superbugsCount >= this.MAX_CAPACITY * 0.8
    };
  }

  recordStats() {
    this.history.push(this.getStats());
  }
}
