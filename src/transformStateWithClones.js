'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  const stateCopy = { ...state };

  for (const obj of actions) {
    const { type } = obj;

    switch (type) {
      case 'addProperties':
        results.push(addProperties(stateCopy, { ...stateCopy }, obj.extraData));
        break;

      case 'removeProperties':
        results.push(
          removeProperties(stateCopy, { ...stateCopy }, obj.keysToRemove),
        );
        break;

      case 'clear':
        results.push(clearProperties(stateCopy, { ...stateCopy }));
        break;
    }
  }

  return results;
}

function addProperties(copy, stateCopy, extraData) {
  Object.assign(copy, extraData);

  return Object.assign(stateCopy, extraData);
}

function removeProperties(copy, stateCopy, keysToRemove) {
  for (const key of keysToRemove) {
    delete copy[key];
    delete stateCopy[key];
  }

  return stateCopy;
}

function clearProperties(copy, stateCopy) {
  for (const key in stateCopy) {
    delete copy[key];
    delete stateCopy[key];
  }

  return stateCopy;
}

module.exports = transformStateWithClones;
