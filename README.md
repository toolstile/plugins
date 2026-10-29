# Toolstile plugins

Public integration packages for [Toolstile](https://toolstile.com), an MCP gateway
for the remote servers connected to your workspace. Choose which tools each
authorized AI app can use in Toolstile.

This repository contains connection configuration, a setup skill, public branding,
and plugin metadata. It installs no executable or dependencies and contains no
credentials. Its MIT license covers this package. Toolstile is a separately
billed service; this package adds no in-app purchase or checkout flow.

## Package formats

- **Portable Agent Plugins:** root `plugin.json` and `mcp.json`, including
  OpenAI listing metadata for preparation of a ChatGPT/Codex submission.
- **Claude:** `.claude-plugin/plugin.json`, `.mcp.json`, and a repository
  marketplace for direct installation.
- **Cursor:** the portable format, plus `.cursor-plugin/plugin.json` for the
  Cursor-specific format.
- **Shared setup guidance:** `skills/toolstile-setup/SKILL.md`.

All configurations point to `https://toolstile.com/mcp`. Use one installation
per intended authorization to avoid duplicate connections.

## Connect your workspace

1. Create a Toolstile account and connect a compatible remote MCP server.
2. Install the appropriate package and complete its browser sign-in prompt.
3. Select the Toolstile workspace this app should use.
4. Grant the new agent access in Toolstile. Signing in alone grants no tools.
5. Refresh discovery, then try a harmless lookup with an allowed tool and check
   the request in Toolstile's Activity view.

The host handles OAuth. Do not add tokens or account credentials to this repo.
Requests go to Toolstile and, when allowed, the remote services you connected.
Available tools and data depend on those services and your grants. The setup
skill does not change permissions or connect upstream accounts automatically.

Read the [client setup guides](https://toolstile.com/docs/clients),
[permissions](https://toolstile.com/docs/permissions),
[privacy policy](https://toolstile.com/privacy), and
[terms](https://toolstile.com/terms).

## Claude Code installation

In Claude Code, add this repository marketplace and install the plugin:

```text
/plugin marketplace add toolstile/plugins
/plugin install toolstile@toolstile
```

Complete the MCP sign-in prompt and grant the agent access in Toolstile.
This installs from our repository, independently of an official directory listing.

## Cursor local installation

```sh
mkdir -p ~/.cursor/plugins/local
git clone https://github.com/toolstile/plugins.git ~/.cursor/plugins/local/toolstile
```

Restart Cursor or run **Developer: Reload Window**. Check **Customize → MCPs**
for the server and sign-in prompt. Organization policy must allow local plugin
imports. A marketplace installation with the same name takes precedence over
a local copy. Alternatively, use the public
[manual Cursor setup guide](https://toolstile.com/docs/clients/cursor).

## Listing and verification status

Repository publication does not mean approval by any directory. Cursor,
Anthropic, and OpenAI have separate submission and review processes.
Authenticated calls and installation in each host still need verification.
Grok Bot compatibility and availability in its catalog remain unverified.

OpenAI directory eligibility also requires clarification: its guidelines exclude
plugins that primarily act as unofficial third-party connectors, including
pass-through intermediary layers. No approval or policy exception is claimed.

## Troubleshooting and support

If no tools appear, check the selected workspace, agent grants, and upstream
sign-in status. If a tool requires approval, review it in Toolstile and retry
the identical call after approval. Approval does not execute the call itself.

Uninstalling the package removes it from the host. Revoke the agent in Toolstile
to invalidate its authorization too.

For support, bug reports, or feature requests, email
[support@toolstile.com](mailto:support@toolstile.com).
Directory and publisher contact: [contact@toolstile.com](mailto:contact@toolstile.com).
GitHub Issues are disabled. Do not send credentials or private request data.
