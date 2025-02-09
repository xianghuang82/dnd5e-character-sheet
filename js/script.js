// 计算属性修正值的函数
function calculateModifier(score) {
    return Math.floor((score - 10) / 2);
}

// 定义各民族的属性加成
const raceBonuses = {
    "人类": { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
    "精灵": { strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
    "矮人": { strength: 0, dexterity: 0, constitution: 2, intelligence: 0, wisdom: 0, charisma: 0 },
    "半身人": { strength: 0, dexterity: 2, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
    "侏儒": { strength: 0, dexterity: 0, constitution: 0, intelligence: 2, wisdom: 0, charisma: 0 },
    "半精灵": { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 2 },
    "半兽人": { strength: 2, dexterity: 0, constitution: 1, intelligence: 0, wisdom: 0, charisma: 0 },
    "龙裔": { strength: 2, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 1 },
    "提夫林": { strength: 0, dexterity: 0, constitution: 0, intelligence: 1, wisdom: 0, charisma: 2 },
    "亚斯敏": { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 2 },
    "变体人类": { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 }
};

// 存储手动调整技能的数量
let adjustedSkillsCount = 0;

// 更新属性值和修正值的函数
function updateAttributes() {
    const race = document.getElementById('race').value;
    const baseStrength = 10;
    const baseDexterity = 10;
    const baseConstitution = 10;
    const baseIntelligence = 10;
    const baseWisdom = 10;
    const baseCharisma = 10;

    const strengthBonus = raceBonuses[race].strength;
    const dexterityBonus = raceBonuses[race].dexterity;
    const constitutionBonus = raceBonuses[race].constitution;
    const intelligenceBonus = raceBonuses[race].intelligence;
    const wisdomBonus = raceBonuses[race].wisdom;
    const charismaBonus = raceBonuses[race].charisma;

    const strength = baseStrength + strengthBonus;
    const dexterity = baseDexterity + dexterityBonus;
    const constitution = baseConstitution + constitutionBonus;
    const intelligence = baseIntelligence + intelligenceBonus;
    const wisdom = baseWisdom + wisdomBonus;
    const charisma = baseCharisma + charismaBonus;

    // 确保属性值在 1 到 30 的范围内
    document.getElementById('strength').value = Math.min(Math.max(strength, 1), 30);
    document.getElementById('dexterity').value = Math.min(Math.max(dexterity, 1), 30);
    document.getElementById('constitution').value = Math.min(Math.max(constitution, 1), 30);
    document.getElementById('intelligence').value = Math.min(Math.max(intelligence, 1), 30);
    document.getElementById('wisdom').value = Math.min(Math.max(wisdom, 1), 30);
    document.getElementById('charisma').value = Math.min(Math.max(charisma, 1), 30);

    updateModifiers();
}

// 更新属性修正值的函数
function updateModifiers() {
    const strength = parseInt(document.getElementById('strength').value);
    const dexterity = parseInt(document.getElementById('dexterity').value);
    const constitution = parseInt(document.getElementById('constitution').value);
    const intelligence = parseInt(document.getElementById('intelligence').value);
    const wisdom = parseInt(document.getElementById('wisdom').value);
    const charisma = parseInt(document.getElementById('charisma').value);

    // 计算并更新属性修正值
    const strengthModifier = calculateModifier(strength);
    document.getElementById('strength-modifier').textContent = strengthModifier;

    const dexterityModifier = calculateModifier(dexterity);
    document.getElementById('dexterity-modifier').textContent = dexterityModifier;

    const constitutionModifier = calculateModifier(constitution);
    document.getElementById('constitution-modifier').textContent = constitutionModifier;

    const intelligenceModifier = calculateModifier(intelligence);
    document.getElementById('intelligence-modifier').textContent = intelligenceModifier;

    const wisdomModifier = calculateModifier(wisdom);
    document.getElementById('wisdom-modifier').textContent = wisdomModifier;

    const charismaModifier = calculateModifier(charisma);
    document.getElementById('charisma-modifier').textContent = charismaModifier;

    // 更新技能加值
    updateSkillBonuses();
}

// 更新技能加值的函数
function updateSkillBonuses() {
    const strengthModifier = parseInt(document.getElementById('strength-modifier').textContent);
    const dexterityModifier = parseInt(document.getElementById('dexterity-modifier').textContent);
    const intelligenceModifier = parseInt(document.getElementById('intelligence-modifier').textContent);
    const wisdomModifier = parseInt(document.getElementById('wisdom-modifier').textContent);
    const charismaModifier = parseInt(document.getElementById('charisma-modifier').textContent);

    const skillModifiers = {
        "athletics": strengthModifier,
        "acrobatics": dexterityModifier,
        "sleight-of-hand": dexterityModifier,
        "stealth": dexterityModifier,
        "history": intelligenceModifier,
        "investigation": intelligenceModifier,
        "nature": intelligenceModifier,
        "religion": intelligenceModifier,
        "animal-handling": wisdomModifier,
        "insight": wisdomModifier,
        "medicine": wisdomModifier,
        "perception": wisdomModifier,
        "survival": wisdomModifier,
        "deception": charismaModifier,
        "performance": charismaModifier,
        "intimidation": charismaModifier,
        "persuasion": charismaModifier
    };

    for (const skill in skillModifiers) {
        const baseBonus = skillModifiers[skill];
        const adjustSelect = document.getElementById(`${skill}-adjust`);
        const adjustValue = parseInt(adjustSelect.value);
        const totalBonus = baseBonus + adjustValue;
        document.getElementById(`${skill}-bonus`).textContent = totalBonus;
    }
}

// 调整技能加值的函数
function adjustSkillBonus(skill) {
    const adjustSelect = document.getElementById(`${skill}-adjust`);
    const adjustValue = parseInt(adjustSelect.value);

    if (adjustValue > 0) {
        adjustedSkillsCount++;
    } else {
        adjustedSkillsCount--;
    }

    // 限制最多调整 2 项技能
    const allSelects = document.querySelectorAll('.character-skills select');
    allSelects.forEach(select => {
        if (select.id !== `${skill}-adjust`) {
            if (adjustedSkillsCount >= 2 && parseInt(select.value) === 0) {
                select.disabled = true;
            } else {
                select.disabled = false;
            }
        }
    });

    updateSkillBonuses();
}

// 初始化时更新一次属性和修正值
updateAttributes();

// 监听种族选择框的变化
const raceSelect = document.getElementById('race');
raceSelect.addEventListener('change', updateAttributes);

// 监听能力值输入框的变化
const abilityInputs = document.querySelectorAll('.ability-scores input[type="number"]');
abilityInputs.forEach(input => {
    input.addEventListener('input', updateModifiers);
});
