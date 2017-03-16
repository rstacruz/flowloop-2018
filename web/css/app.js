function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('./base/', true, /\.css$/))
requireAll(require.context('./transitions/', true, /\.css$/))
requireAll(require.context('./components/', true, /\.css$/))
