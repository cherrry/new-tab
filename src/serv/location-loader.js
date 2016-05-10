let load = function () {
  return localStorage.getItem('current_location') || 'hongkong' // Base in Hong Kong by default
}

export default load
