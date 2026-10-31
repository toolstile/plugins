# Toolstile plugins

Public integration packages for [Toolstile](https://www.toolstile.com), an MCP gateway
for the remote servers connected to your workspace. Choose which tools each
authorized AI app can use in Toolstile.

## Install

### Claude Code

Add this repository marketplace and install the plugin:

```text
/plugin marketplace add toolstile/plugins
/plugin install toolstile@toolstile
```

Complete the MCP sign-in prompt, then grant the agent access in Toolstile.
This installs from this repository, independently of any directory listing.

### Cursor

```sh
mkdir -p ~/.cursor/plugins/local
git clone https://github.com/toolstile/plugins.git ~/.cursor/plugins/local/toolstile
```

Restart Cursor or run **Developer: Reload Window**. Check **Customize → MCPs**
for the server and sign-in prompt. Organization policy must allow local plugin
imports. A marketplace installation with the same name takes precedence over
a local copy. Alternatively, use the
[manual Cursor setup guide](https://www.toolstile.com/docs/clients/cursor).

### Other clients

Point any client that supports remote MCP with OAuth at
`https://mcp.toolstile.com/mcp`. See the
[client setup guides](https://www.toolstile.com/docs/clients).

## Connect your workspace

1. Create a Toolstile account and connect a compatible remote MCP server.
2. Install the package and complete its browser sign-in prompt.
3. Select the Toolstile workspace this app should use.
4. Grant the new agent access in Toolstile. Signing in alone grants no tools.
5. Refresh discovery, then try a harmless lookup with an allowed tool and check
   the request in Toolstile's Activity view.

The host handles OAuth. Do not add tokens or account credentials to this repo.
Requests go to Toolstile and, when allowed, the remote services you connected.
Available tools and data depend on those services and your grants. The setup
skill does not change permissions or connect upstream accounts automatically.

Read [permissions](https://www.toolstile.com/docs/permissions), the
[privacy policy](https://www.toolstile.com/privacy) and the
[terms](https://www.toolstile.com/terms).

## Compatibility

- **Claude:** `.claude-plugin/plugin.json`, `.mcp.json`, and a repository
  marketplace for direct installation.
- **Cursor:** `.cursor-plugin/plugin.json`, plus the portable format below.
- **Portable Agent Plugins:** root `plugin.json` and `mcp.json`.
- **Shared setup guidance:** `skills/toolstile-setup/SKILL.md`.

All configurations point to `https://mcp.toolstile.com/mcp`. Use one installation
per intended authorization to avoid duplicate connections.

This repository contains connection configuration, a setup skill, public
branding and plugin metadata. It installs no executable or dependencies and
contains no credentials. Its MIT license covers this package. Toolstile is a
separately billed service; this package adds no in-app purchase or checkout flow.
Publication here does not mean approval by any plugin directory.

## Troubleshooting

If no tools appear, check the selected workspace, agent grants, and upstream
sign-in status. If a tool requires approval, review it in Toolstile and retry
the identical call after approval. Approval does not execute the call itself.

Uninstalling the package removes it from the host. Revoke the agent in Toolstile
to invalidate its authorization too.

## Support

For support, bug reports, or feature requests, email
[support@toolstile.com](mailto:support@toolstile.com).
Directory and publisher contact: [contact@toolstile.com](mailto:contact@toolstile.com).
GitHub Issues are disabled. Do not send credentials or private request data.
