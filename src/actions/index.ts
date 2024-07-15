import { v4 as uuidv4 } from "uuid";
import store from "store2";
import { defaultPack, Pack, UserLearningProgress } from "./dataType";

export async function getAllPack(): Promise<Pack[]> {
  const packIds = store.get("packIds") || [];
  const packs = packIds.map((packId: string) => store.get(packId));
  return packs;
}

export async function getLastestLearningPack(total: number): Promise<Pack[]> {
  const packs = await getAllPack();
  const lastestPacks = packs.filter((pack: Pack) => pack.learning && pack.learning.at >= 0);
  return lastestPacks.slice(0, total);
}

export async function getUserLearningProgress(): Promise<UserLearningProgress> {
  const allPacks = await getAllPack();
  const hourInSeconds = 3600;
  return {
    packs: allPacks.length,
    cards: allPacks.reduce((totalCards: number, pack: Pack) => totalCards + (pack.card?.length || 0), 0),
    learned: allPacks.reduce((totalLearned: number, pack: Pack) => totalLearned + (pack.learnedTimes || 0), 0),
    hours: Math.floor(
      allPacks.reduce((totalTimeLearned: number, pack: Pack) => totalTimeLearned + (pack.timeSpent || 0), 0) /
        hourInSeconds,
    ),
  };
}

export async function getPack(id: string): Promise<Pack> {
  return store.get(id);
}

export async function createPack(newPack: Pack): Promise<void> {
  const packIds = store.get("packIds") || [];
  const newPackId = uuidv4();
  store.set("packIds", [newPackId, ...packIds]);
  store.set(newPackId, newPack || defaultPack);
}

export async function updatePack(upPack: Pack): Promise<void> {
  if (upPack.lastLearn) {
    const packIds = store.get("packIds") || [];
    store.set("packIds", [upPack.id, ...packIds.filter((packId: string) => packId === upPack.id)]);
  }

  const oldPack = store.get(upPack.id);
  store.set(upPack.id, { ...oldPack, ...upPack });
}

export async function deletePack(id: string): Promise<void> {
  store.set(
    "packIds",
    store.get("packIds").filter((packId: string) => packId === id),
  );
  store.remove(id);
}
