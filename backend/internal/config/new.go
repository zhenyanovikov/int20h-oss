package config

import (
	"flag"
	"fmt"
	"sync"

	goconfig "github.com/Yalantis/go-config"
)

var (
	config        Config
	isInitialised bool
	mutex         = new(sync.Mutex)
)

const configFilename = "config.json"

type Config struct {
	Address  string   `json:"address" default:":8080"`
	Postgres Postgres `json:"postgres"`
	Redis    Redis    `json:"redis"`
	Log      Logger   `json:"logger"`
}

type Postgres struct {
	Host     string `json:"host" default:"localhost"`
	Port     int    `json:"port" default:"5432"`
	Database string `json:"database" default:"oss"`
	User     string `json:"user" default:"oss"`
	Password string `json:"password"`
	Log      bool   `json:"log" default:"true"`
}

type Redis struct {
	Address  string `json:"address"`
	Password string `json:"password"`
}

type Logger struct {
	Level string `json:"level" default:"info"`
}

func New() (Config, error) {
	var cfg Config

	filename := configFilename

	flag.Parse()

	if flag.Arg(0) != "" {
		filename = flag.Arg(0)
	}

	if err := goconfig.Init(&cfg, filename); err != nil {
		return Config{}, fmt.Errorf("init config: %w", err)
	}

	config = cfg
	isInitialised = true

	return cfg, nil
}

func Get() Config {
	mutex.Lock()
	if !isInitialised {
		cfg, err := New()
		if err != nil {
			panic(err)
		}
		config = cfg
	}
	mutex.Unlock()

	return config
}
