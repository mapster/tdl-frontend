import uuid from 'uuid/v4';

export const findSourceFileIndex = (sourceFiles, id) => sourceFiles.findIndex(file => file.id === id);

export const findSourceFile = (sourceFiles, id) => sourceFiles[findSourceFileIndex(sourceFiles, id)];

export const getValidSourceFileId = (sourceFiles, currentId) => {
  if (findSourceFileIndex(sourceFiles, currentId) >= 0) {
    return currentId;
  }

  return getNewCurrentSourceFileId(sourceFiles);
};

export const getNewCurrentSourceFileId = (sourceFiles, index = -1) => {
  if (index >= 0) {
    if (sourceFiles.length === 1) {
      return null;
    } else if (index === sourceFiles.length - 1) {
      return sourceFiles[index - 1].id;
    } else {
      return sourceFiles[index + 1].id;
    }
  } else {
    if (sourceFiles.length === 0) {
      return null;
    } else {
      return sourceFiles[0].id;
    }
  }
};

export const newFile = (data, isChanged = false, isNew = false, isReadOnly = false) => ({
  id: data.id,
  data: {contents: '', ...data},
  isChanged,
  isNew,
  isReadOnly,
});


export const reduceExistingSourceFile = (sourceFiles, data, isChanged, isDelete, index = -1) => {
  if (index < 0) {
    index = findSourceFileIndex(sourceFiles, data.id);
  }
  const reducedSourceFiles = [...sourceFiles];
  reducedSourceFiles[index] = {
    ...reducedSourceFiles[index],
    data,
    isChanged,
    isDelete,
  };
  return reducedSourceFiles;
};

export const reduceSourceFilesIntoExisting = (existingFiles, updatedFiles) => {
  const existingWithChanges = existingFiles.filter(file => file.isChanged && !file.isDelete);
  const fileUpdatesWithoutExistingChanges = Object.keys(updatedFiles)
    .map(name => updatedFiles[name])
    .map(data => newFile(data))
    .filter(file => findSourceFileIndex(existingWithChanges, file.id) < 0);

  const reduced = [...existingWithChanges, ...fileUpdatesWithoutExistingChanges];
  if (reduced.length > 0) {
    return reduced;
  } else {
    return [newFile({id: uuid(), name: 'new'}, true, true)];
  }
};

export const findClass = (sourceFiles, name) => sourceFiles.map(sf => sf.data).filter(sf => sf.name === `${name}.java`)[0];
