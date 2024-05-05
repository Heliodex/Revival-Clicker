// biome-ignore format: it's better this way
export default [
	["Begin revival development", 20, []],

	["Begin site development", 50, ["Begin revival development"]],
		["File storage", 100, ["Begin site development"]],
		["Site layout", 50, ["Begin site development"]],
			["Site navigation", 100, ["Site layout"]],
				["Site search", 200, ["Site navigation", "Database integration"]],
			["Site styling", 100, ["Site layout"]],
				["Custom site theming", 200, ["Site styling"]],
				["Site responsiveness", 300, ["Site styling", "Site navigation"]],
				["Site interactivity", 500, ["Site styling"]],
				["Site accessibility", 200, ["Site styling"]],
		["Homepage", 100, ["Begin site development"]],
		["Email system", 300, ["Begin site development"]],
		["Reverse proxy", 200, ["Begin site development"]],
			["Site load balancing", 300, ["Reverse proxy"]],
			["File caching", 200, ["Reverse proxy"]],
			["TLS certificate", 200, ["Reverse proxy"]],
				["HTTPS integration", 200, ["TLS certificate"]],
		["Database integration", 150, ["Begin site development"]],
			["User accounts", 150, ["Database integration"]],
				["User authentication", 350, ["User accounts"]],
					["User registration", 100, ["User authentication"]],
						["User login", 100, ["User registration"]],
						["Email verification", 300, ["User registration", "Email system"]],
				["User profiles", 100, ["User accounts"]],
					["User status", 100, ["User profiles"]],
						["Feed system", 200, ["User status"]],
					["Character customisation", 500, ["User profiles"]],
						["Render characters on site", 200, ["Character customisation", "Character rendering"]],
					["User badges", 250, ["User profiles"]],
					["User settings", 300, ["User profiles"]],
					["Friends system", 400, ["User profiles"]],
						["Followers system", 200, ["Friends system"]],
				["Currency", 100, ["User accounts"]],
					["Transactions", 300, ["Currency"]],
						["Trading systems", 700, ["Transactions", "Limited assets"]],
				["User moderation", 400, ["User accounts"]],
					["Account warnings", 150, ["User moderation"]],
					["Account bans", 150, ["User moderation"]],
					["Account terminations", 150, ["User moderation"]],
						["Reports system", 200, ["Account warnings", "Account bans", "Account terminations"]],
				["Private messages", 300, ["User accounts"]],
				["Groups", 300, ["User accounts"]],
			["Places", 200, ["Database integration"]],
				["Place joining", 50, ["Places", "Join script"]],
				["Place hosting", 100, ["Places", "Host script"]],
				["Place settings", 200, ["Places"]],
					["Place comments", 250, ["Place settings"]],
				["Integrate places with assets", 300, ["Places"]],
			["Forum", 200, ["Database integration"]],
				["Forum posts", 200, ["Forum"]],
					["Forum comments", 250, ["Forum posts"]],
						["Nested forum comments", 300, ["Forum comments"]],
			["Catalog", 250, ["Database integration", "File storage"]],
				["Image uploads", 50, ["Catalog",]],
					["Decal uploads", 50, ["Image uploads"]],
					["Clothing uploads", 50, ["Image uploads"]],
						["T-shirt uploads", 50, ["Clothing uploads"]],
						["Hat uploads", 100, ["Clothing uploads"]],
							["Accessory uploads", 50, ["Hat uploads"]],
						["Gear uploads", 150, ["Clothing uploads", "Script uploads", "Audio uploads"]],
				["Script uploads", 100, ["Catalog"]],
				["Audio uploads", 50, ["Catalog"]],
				["Asset settings", 200, ["Catalog"]],
					["Asset comments", 250, ["Asset settings", "Forum comments"]],
						["Nested asset comments", 300, ["Asset comments", "Nested forum comments"]],
					["Asset pricing", 200, ["Asset settings"]],
						["Asset sales", 300, ["Asset pricing"]],
							["Limited assets", 500, ["Asset sales", "Hat uploads", "Gear uploads"]],
	["Get domain name", 100, ["Begin revival development"]],
		["Site hosting", 300, ["Begin site development", "Get domain name"]],
	["Acquire client", 50, ["Begin revival development"]],
		["Create launcher", 300, ["Acquire client"]],
		["Patch client", 400, ["Acquire client"]],
			["Patch client vulnerabilities", 800, ["Patch client"]],
			["DLL hooking", 800, ["Patch client"]],
				["Anticheat system", 1000, ["DLL hooking"]],
			["Load assets", 300, ["Patch client"]],
				["Load character appearance", 400, ["Load assets"]],
		["Load FFlags", 250, ["Acquire client"]],
			["FFlag modifications", 50, ["Load FFlags"]],
		["Load Corescripts", 200, ["Acquire client"]],
			["Patch Corescripts", 300, ["Load Corescripts"]],
				["Corescript optimisations", 1000, ["Patch Corescripts", "Join script", "Visit script"]],
					["Corescript performance", 500, ["Corescript optimisations"]],
					["Corescript compression", 300, ["Corescript optimisations"]],
						["Corescript compilation", 1000, ["Corescript compression"]],
							["Corescript modularisation", 500, ["Corescript compilation"]],
			["Host script", 150, ["Load Corescripts", "Patch studio"]],
				["Join script", 300, ["Host script"]],
			["Studio script", 100, ["Load Corescripts", "Patch studio"]],
				["Visit script", 250, ["Studio script"]],
		["Acquire studio", 100, ["Acquire client"]],
			["Patch studio", 500, ["Acquire studio", "Patch client"]],
				["Load studio plugins", 200, ["Patch studio"]],
					["Patch studio plugins", 500, ["Load studio plugins"]],
						["Studio plugin optimisations", 1000, ["Patch studio plugins", "Corescript optimisations"]],
							["Studio plugin performance", 500, ["Studio plugin optimisations", "Corescript performance"]],
							["Studio plugin compression", 300, ["Studio plugin optimisations", "Corescript compression"]],
								["Studio plugin compilation", 1000, ["Studio plugin compression", "Corescript compilation"]],
									["Studio plugin modularisation", 500, ["Studio plugin compilation", "Corescript modularisation"]],
		["Acquire RCCService", 200, ["Acquire client"]],
			["Job creation", 300, ["Acquire RCCService"]],
			["Render scripts", 300, ["Acquire RCCService"]],
				["Mesh rendering", 300, ["Job creation", "Render scripts"]],
				["Model rendering", 500, ["Job creation", "Render scripts"]],
				["Character rendering", 200, ["Job creation", "Render scripts"]],
					["Headshot rendering", 100, ["Character rendering"]],
					["Clothing rendering", 200, ["Character rendering"]],
						["Hat rendering", 500, ["Clothing rendering"]],
							["Accessory rendering", 500, ["Hat rendering"]],
						["Gear rendering", 500, ["Clothing rendering"]],
				["Job viewing", 150, ["Job creation", "Render scripts"]],
					["Job tracking", 100, ["Job viewing"]],
				["RCC host script", 250, ["Job creation", "Render scripts"]],
					["Dedicated hosting", 1000, ["RCC host script", "Job creation"]],
] as [string, number, string[]][]