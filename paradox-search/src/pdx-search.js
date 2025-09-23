'use strict';
import { metadata, } from 'https://no-nameyet.github.io/twwwwwww-core/twdb.js';
import module, { initModule, } from './module/pdx-search.core.js';

// 初期化処理
await initModule();

// ヘルプファイル
const HELP_FILE = await fetch(new URL(`./module/data/information.md`, import.meta.url));
const HELP_MD = await HELP_FILE.text();

// スキル一覧
const SKILLS = module.skills;
// パラドクス一覧
const PARADOXES = module.paradoxes;

// エクスポート
export {
	metadata,
	HELP_MD as help_md,
	SKILLS as skills,
	PARADOXES as paradoxes,
};
export default function() {
	return new class {
		/** 組み合わせ条件：POW1 */
		#entryPow1;
		set entryPow1(num) {
			this.#entryPow1 = num;
		}
		/** 組み合わせ条件：POW2 */
		#entryPow2;
		set entryPow2(num) {
			this.#entryPow2 = num;
		}
		/** 組み合わせ条件：POW3 */
		#entryPow3;
		set entryPow3(num) {
			this.#entryPow3 = num;
		}
		/** 組み合わせ条件：POW4 */
		#entryPow4;
		set entryPow4(num) {
			this.#entryPow4 = num;
		}
		/** 組み合わせ条件：SPD1 */
		#entrySpd1;
		set entrySpd1(num) {
			this.#entrySpd1 = num;
		}
		/** 組み合わせ条件：SPD2 */
		#entrySpd2;
		set entrySpd2(num) {
			this.#entrySpd2 = num;
		}
		/** 組み合わせ条件：SPD3 */
		#entrySpd3;
		set entrySpd3(num) {
			this.#entrySpd3 = num;
		}
		/** 組み合わせ条件：SPD4 */
		#entrySpd4;
		set entrySpd4(num) {
			this.#entrySpd4 = num;
		}
		/** 組み合わせ条件：WIZ1 */
		#entryWiz1;
		set entryWiz1(num) {
			this.#entryWiz1 = num;
		}
		/** 組み合わせ条件：WIZ2 */
		#entryWiz2;
		set entryWiz2(num) {
			this.#entryWiz2 = num;
		}
		/** 組み合わせ条件：WIZ3 */
		#entryWiz3;
		set entryWiz3(num) {
			this.#entryWiz3 = num;
		}
		/** 組み合わせ条件：WIZ4 */
		#entryWiz4;
		set entryWiz4(num) {
			this.#entryWiz4 = num;
		}

		/** 絞り込み：スキル下限 */
		#filterMinSkillBound;
		set filterMinSkillBound(count) {
			this.#filterMinSkillBound = count;
		}
		/** 絞り込み：スキル上限 */
		#filterMaxSkillBound;
		set filterMaxSkillBound(count) {
			this.#filterMaxSkillBound = count;
		}
		/** 絞り込み：スキルを含む */
		#filterIncludeSkill;
		set filterIncludeSkill(skills) {
			this.#filterIncludeSkill = skills;
		}

		/** 一覧の上限 */
		#maxLimit;
		set maxLimit(limit) {
			this.#maxLimit = limit;
		}

		/** コンストラクタ */
		constructor() {
			this.resetCondition();
		}

		/** 条件の初期化 */
		resetCondition() {
			this.entryPow1 = 0;
			this.entryPow2 = 0;
			this.entryPow3 = 0;
			this.entryPow4 = 0;
			this.entrySpd1 = 0;
			this.entrySpd2 = 0;
			this.entrySpd3 = 0;
			this.entrySpd4 = 0;
			this.entryWiz1 = 0;
			this.entryWiz2 = 0;
			this.entryWiz3 = 0;
			this.entryWiz4 = 0;
			this.filterMinSkillBound = 3;
			this.filterMaxSkillBound = 10;
			this.#filterIncludeSkill = [];
			this.maxLimit = 250;
		}

		/** 組み合わせ処理実行 */
		async generate() {
			// 組み合わせ条件
			let entryCondition = [];
			entryCondition.push(...Array(this.#entryPow1).fill({ status: 'POW', target: '1', }));
			entryCondition.push(...Array(this.#entryPow2).fill({ status: 'POW', target: '2', }));
			entryCondition.push(...Array(this.#entryPow3).fill({ status: 'POW', target: '3', }));
			entryCondition.push(...Array(this.#entryPow4).fill({ status: 'POW', target: '4', }));
			entryCondition.push(...Array(this.#entrySpd1).fill({ status: 'SPD', target: '1', }));
			entryCondition.push(...Array(this.#entrySpd2).fill({ status: 'SPD', target: '2', }));
			entryCondition.push(...Array(this.#entrySpd3).fill({ status: 'SPD', target: '3', }));
			entryCondition.push(...Array(this.#entrySpd4).fill({ status: 'SPD', target: '4', }));
			entryCondition.push(...Array(this.#entryWiz1).fill({ status: 'WIZ', target: '1', }));
			entryCondition.push(...Array(this.#entryWiz2).fill({ status: 'WIZ', target: '2', }));
			entryCondition.push(...Array(this.#entryWiz3).fill({ status: 'WIZ', target: '3', }));
			entryCondition.push(...Array(this.#entryWiz4).fill({ status: 'WIZ', target: '4', }));

			// 絞り込み条件
			let filterCondition = {
				minSkillBound: this.#filterMinSkillBound,
				maxSkillBound: this.#filterMaxSkillBound,
				includeSkills: this.#filterIncludeSkill,
			};

			// 組み合わせの抽出
			return await module.generateParadoxCombo(entryCondition, filterCondition, this.#maxLimit);
		}
	}();
}
