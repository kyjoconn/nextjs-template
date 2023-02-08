// PM2 configuration for production

module.exports = {
    apps : [ {
        name: 'nextjs-template',
        cwd: '.',
        script: 'node_modules/.bin/next',
        args: 'start',
        instances: 0,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        exec_mode: 'cluster',
        env: {
        {% for key, value in node_service_env_settings.items() %}
{{ key }}: '{{ value }}',
{% endfor %}
},
}],
};