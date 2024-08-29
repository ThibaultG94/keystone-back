import { ListHooks } from '@keystone-6/core/types';

export const resolveSlugService: ListHooks<any>['resolveInput'] = async ({ resolvedData, item, operation }) => {
  // Si un slug est fourni, on l'utilise
  if (resolvedData.slug) {
    return resolvedData;
  }

  // On utilise le titre soit de resolvedData (création) soit de l'item existant (mise à jour)
  const title = resolvedData.title || item?.title;
  
  if (title) {
    resolvedData.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  return resolvedData;
};
