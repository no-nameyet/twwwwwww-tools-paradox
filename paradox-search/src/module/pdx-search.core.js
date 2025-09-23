'use strict';
import twdb from 'https://no-nameyet.github.io/twwwwwww-core/twdb.js';
import init, { paradox_combination, } from './wasm/paradox_combination_wasm.js';

//
// 定数
//
// SQL文
const SQL = {
	// スキル一覧
	SKILL: ({ where, }) => `
		SELECT
			id
			, skill
			, prefix
		from tw7_skills
		${where}
		order by index`,
	// パラドクス一覧
	PARDOX: ({ where, }) => `
		SELECT
			id
			, name
			, status
			, target
			, effect1
			, effect2
			, skills
		from tw7_paradox
		${where}
		order by index`,
};

//
// 初期化処理
//

// スキル一覧
const SKILLS = Object.freeze((await searchSkill()));
const SKILLS_MAP = SKILLS.reduce((obj, record) => {
	obj[record.id] = Object.freeze(record);
	return obj;
}, {});

// パラドクス一覧
const PARADOXES = Object.freeze((await searchParadox()));
const PARADOXES_MAP = PARADOXES.reduce((obj, record) => {
	obj[record.id] = Object.freeze(record);
	return obj;
}, {});

//
// 関数
//
// モジュール初期化
export async function initModule() {
	// WASM初期化
	await init();
}

// スキル一覧取得
async function searchSkill() {
	// 検索処理
	return await twdb.query(SQL.SKILL({ where: '', }));
}

// パラドクス一覧取得
async function searchParadox(conditions = {}) {
	let where = [];
	for (let [ key, value, ] of Object.entries(conditions)) {
		where.push(`${key} = '${value}'`);
	}
	// SQLの構築
	const sql = where.length > 0
		? SQL.PARDOX({ where: 'where ' + where.join(" AND "), })
		: SQL.PARDOX({ where: '', });
	// 検索処理
	return await twdb.query(sql);
}

/** パラドクスの組み合わせを作る */
async function generateParadoxCombo(entryCondition = [], { minSkillBound = 3, maxSkillBound = 10, includeSkills = [], } = {}, maxLimit = 250) {
	let paradoxList = [];
	for (let conditions of entryCondition) {
		paradoxList.push(await searchParadox(conditions));
	}
	const filter = {
		min_skill_bound: minSkillBound,
		max_skill_bound: maxSkillBound,
		include_skills: includeSkills,
	};
	const combinations = paradox_combination(paradoxList, filter, maxLimit);
	return combinations.map(arr => arr.map(id => ({
		id,
		name: PARADOXES_MAP[id].name,
		status: PARADOXES_MAP[id].status,
		target: PARADOXES_MAP[id].target,
		effect1: PARADOXES_MAP[id].effect1,
		effect2: PARADOXES_MAP[id].effect2,
		skills: PARADOXES_MAP[id].skills.map(id => SKILLS_MAP[id].skill),
	})));
}

// エクスポート
export default {
	skills: function() { return SKILLS; },
	paradoxes: function() { return PARADOXES; },
	generateParadoxCombo,
}
