import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@cardsphere_analytics_v1';

const DEFAULT_STATS = {
  shares: 0,
  exports: 0,
  contactExports: 0,
};

const readStats = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return { ...DEFAULT_STATS };

    const parsed = JSON.parse(stored);
    return { ...DEFAULT_STATS, ...parsed };
  } catch {
    return { ...DEFAULT_STATS };
  }
};

const writeStats = async (stats) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
};

export const analyticsService = {
  getStats: readStats,

  record: async (event) => {
    const stats = await readStats();

    if (event === 'share') stats.shares += 1;
    if (event === 'export') stats.exports += 1;
    if (event === 'contact_export') stats.contactExports += 1;

    await writeStats(stats);
    return stats;
  },

  reset: async () => {
    await writeStats({ ...DEFAULT_STATS });
    return { ...DEFAULT_STATS };
  },
};
