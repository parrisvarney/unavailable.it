<?php
namespace Uit\Component;

class Config {
    public static function getConfig() {
        return parse_ini_file('src/config/config.ini', true);
    }

    public static function getDb($param, $default = null) {
        $config = self::getConfig();
        return $config['db'][$param] ?? $default;
    }
}
